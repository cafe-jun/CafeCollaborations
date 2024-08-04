import { RepositoryRemoveOptions } from '@core/common/persistence/repoistory.option';
import { Optional } from '@core/common/type/common.types';
import { Post } from '@core/domain/post/entity/post';
import { PostOwner } from '@core/domain/post/entity/post-owner';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { ElasticToken } from '@di/infrastructure.module';
import { SearchRequest } from '@elastic/elasticsearch/api/types';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticPostRepository implements PostRepositoryPort, OnModuleInit {
  private readonly index: string = 'post-index';

  constructor(
    @Inject(ElasticToken)
    private readonly esService: ElasticsearchService,
  ) {}

  async onModuleInit() {
    await this.createIndex();
  }

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
              regionCode: { type: 'keyword' },
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

  async findPosts(paging: { pageNo: number; pageSize: number }, filters?: { category?: string; regionCode?: string; keyword?: string }) {
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
    };

    if (filters?.keyword) {
      (body.query.bool.filter as any[]).push({
        multi_match: {
          query: filters.keyword,
          fields: ['title^2', 'content'],
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
      (body.query.bool.filter as any[]).push({ term: { category: filters.category } });
    }

    if (filters?.regionCode) {
      (body.query.bool.filter as any[]).push({ term: { regionCode: filters.regionCode } });
    }
    const { body: result } = await this.esService.search({
      index: this.index,
      body,
    });
    const items = result.hits.hits.map((hit) => {
      const result = {
        id: Number(hit._source.id),
        owner: hit._source.owner,
        title: hit._source.title,
        category: hit._source.category,
        content: hit._source.content,
        status: hit._source.status,
        regionCode: hit._source.regionCode,
        createdAt: hit._source.createdAt,
        updatedAt: hit._source.updatedAt,
      };

      return new Post({
        id: result.id,
        owner: new PostOwner(result.owner.id, result.owner.name),
        title: result.title,
        content: result.content,
        status: result.status,
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
      regionCode: post.getRegionCode(),
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
    const { body } = await this.esService.get<{ _source: PostUseCaseDto }>({
      index: this.index,
      id: payload.id.toString(),
    });

    return Post.toPostDomain(body._source);
  }
}
