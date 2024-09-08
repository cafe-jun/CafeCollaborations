import { Region } from '@core/common/enums/region.enum';
import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';
import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostOwner } from '@core/domain/post/entity/post-owner';
import { ElasticPostPayload } from '@core/domain/post/entity/type/elastic-post.payload';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { ElasticToken } from '@di/infrastructure.module';
import { SearchRequest } from '@elastic/elasticsearch/api/types';
import { Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { isEmpty } from '@shared/data.helper';
import { Category } from '@core/common/enums/category.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Duration } from '@core/common/enums/duration-type.enum';

@Injectable()
export class ElasticPostRepository implements PostRepositoryPort {
  private readonly index: string = 'post_index';

  constructor(
    @Inject(ElasticToken)
    private readonly esService: ElasticsearchService,
  ) {}

  private async createIndex() {
    const checkIndex = await this.esService.indices.exists({ index: this.index });

    if (!checkIndex.body) {
      await this.esService.indices.create({
        index: this.index,
        body: {
          settings: {
            number_of_shards: 1,
            number_of_replicas: 1,
            analysis: {
              tokenizer: {
                nori_tokenizer: {
                  type: 'nori_tokenizer',
                },
              },
              analyzer: {
                nori_analyzer: {
                  type: 'custom',
                  tokenizer: 'nori_tokenizer',
                },
              },
            },
          },
          mappings: {
            properties: {
              id: { type: 'integer' },
              title: { type: 'text', analyzer: 'nori_analyzer' },
              content: { type: 'text', analyzer: 'nori_analyzer' },
              category: { type: 'keyword' },
              status: { type: 'keyword' },
              region: { type: 'keyword' },
              duration: { type: 'keyword' },
              recruitMember: { type: 'keyword' },
            },
          },
        },
      });
    }
  }
  async indexAllPosts(posts: Post[]) {
    const body = posts.flatMap((post) => [{ index: { _index: this.index, _id: post.getId() } }, this.postToElasticsearchBody(post)]);
    await this.esService.bulk({ body });
  }

  async indexPost(post: Post) {
    await this.esService.index({
      index: this.index,
      id: post.getId().toString(),
      body: this.postToElasticsearchBody(post),
    });
  }

  async findPosts(paging: { pageNo: number; pageSize: number }, filters?: { category?: string[]; region?: string[]; keyword?: string }) {
    const body: SearchRequest['body'] = {
      from: (paging.pageNo - 1) * paging.pageSize,
      size: paging.pageSize,
      track_total_hits: true,
      query: {
        bool: {
          must: [],
          filter: [], // 필터를 배열로 초기화합니다.
        },
      },
      sort: [{ id: 'desc' }],
    };

    if (filters?.keyword) {
      (body.query.bool.filter as any[]).push({
        multi_match: {
          query: filters.keyword,
          fields: ['title', 'content'],
          type: 'cross_fields',
          analyzer: 'nori_analyzer',
        },
      });
    } else {
      (body.query.bool.filter as any[]).push({
        match_all: {},
      });
    }
    if (filters?.category) {
      (body.query.bool.filter as any[]).push({ terms: { 'category.keyword': filters.category } });
    }

    if (filters?.region) {
      (body.query.bool.filter as any[]).push({ terms: { 'region.keyword': filters.region } });
    }

    const { body: result } = await this.esService.search({
      index: this.index,
      body,
    });

    const items = result.hits.hits.map((hit) => {
      const result = {
        id: hit._source.id,
        ownerId: hit._source.ownerid,
        ownerEmail: hit._source.owneremail,
        title: hit._source.title,
        category: hit._source.category,
        content: hit._source.content,
        status: hit._source.status,
        duration: hit._source?.duration,
        recruitMember: hit.source?.recruitMember,
        region: hit._source.region,
        createdAt: hit._source.createdAt,
        updatedAt: hit._source.updatedAt,
      };

      return new Post({
        id: result.id,
        owner: new PostOwner(result.ownerId, result.ownerEmail),
        title: result.title,
        content: result.content,
        status: result.status,
        category: result.category,
        region: result.region,
        duration: result.duration,
        recruitMember: result.recruitMember,
        createdAt: result.createdAt,
      });
    });

    return { items, totalCount: result.hits.total.value };
  }

  async updatePost(post: Post): Promise<{ id: number }> {
    await this.esService.update({
      index: this.index,
      id: post.getId().toString(),
      body: {
        doc: this.postToElasticsearchBody(post),
      },
      refresh: true,
    });
    return { id: post.getId() };
  }

  async removePost(post: Post, options?: RepositoryRemoveOptions): Promise<void> {
    await this.esService.delete({
      index: this.index,
      id: post.getId().toString(),
    });
  }

  private postToElasticsearchBody(post: Post) {
    return {
      id: post.getId(),
      owner: post.getOwner(),
      title: post.getTitle(),
      category: post.getCategory(),
      content: post.getContent(),
      status: post.getStatus(),
      region: post.getRegion(),
      duration: post.getDuration(),
      recruitMember: post.getRecruitMember(),
    };
  }

  async addPost(post: Post): Promise<{ id: number }> {
    await this.esService.index({
      index: this.index,
      id: post.getId().toString(),
      body: this.postToElasticsearchBody(post),
    });
    return;
  }

  async findPostById(payload: { id: number }): Promise<Optional<Post>> {
    const { body } = await this.esService.search<{ _source: ElasticPostPayload }>({
      index: this.index,
      body: {
        query: {
          match: { _id: payload.id },
        },
      },
    });
    if (isEmpty(body._source)) return;
    return new Post({
      id: body._source.id,
      title: body._source.title,
      content: body._source.content,
      category: Category.getByCode(body._source.category),
      recruitMember: RecruitMember.getByCode(body._source.recruitMember),
      duration: Duration.getByCode(body._source.duration),
      region: Region.getByCode(body._source.region),
      owner: new PostOwner(body._source.ownerid, body._source.owneremail),
      createdAt: body._source.createdAt,
    });
  }
}
