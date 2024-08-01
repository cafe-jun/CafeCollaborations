import { Post } from '@core/domain/post/entity/post';
import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

interface PostSearchBody {
  id: number;
  title: string;
  category: string;
  content: string;
  // 기타 필요한 필드들...
}

@Injectable()
export class PostSearchService {
  private readonly index: string;

  constructor(
    private readonly esService: ElasticsearchService,
    private readonly postRepositoryPort: PostRepositoryPort,
  ) {}

  async createIndex() {
    const checkIndex = await this.esService.indices.exists({ index: process.env.ELASTICSEARCH_INDEX });
    if (checkIndex) {
      this.esService.indices.create({
        index: process.env.ELASTICSEARCH_INDEX,
        mappings: {
          properties: {
            id: { type: 'integer' },
            title: { type: 'text', analyzer: 'standard' },
            content: { type: 'text', analyzer: 'standard' },
            category: { type: 'keyword' },
            status: { type: 'keyword' },
            regionCode: { type: 'keyword' },
          },
        },
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
          analysis: {
            analyzer: {
              custom_analyzer: {
                type: 'custom',
                tokenizer: 'standard',
                filter: ['lowercase', 'asciifolding'],
              },
            },
          },
        },
      });
      await this.indexAllPosts();
    }
  }
  async indexAllPosts() {
    const posts = await this.postRepositoryPort.findAllPost();
    const body = posts.flatMap((post) => [{ index: { _index: this.index, _id: post.getId() } }, this.postToElasticsearchBody(post)]);

    await this.esService.bulk({ body });
  }

  private postToElasticsearchBody(post: Post) {
    return {
      id: post.getId(),
      title: post.getTitle(),
      category: post.getCategory(),
      content: post.getContent(),
      status: post.getStatus(),
      regionCode: post.getRegionCode(),
    };
  }

  async indexPost(post: Post) {
    await this.esService.index({
      index: this.index,
      id: post.getId().toString(),
      body: this.postToElasticsearchBody(post),
    });
  }

  async search(query: string, filters?: { category?: string; regionCode?: string }) {
    const body = {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: ['title^2', 'content'],
              },
            },
          ],
          filter: [],
        },
      },
    };

    if (filters?.category) {
      body.query.bool.filter.push({ term: { category: filters.category } });
    }

    if (filters?.regionCode) {
      body.query.bool.filter.push({ term: { regionCode: filters.regionCode } });
    }

    const result = await this.esService.search<PostSearchBody>({
      index: this.index,
      body,
    });

    return result.hits.hits.map((hit) => ({
      id: hit._source.id,
      title: hit._source.title,
      category: hit._source.category,
      content: hit._source.content,
      score: hit._score,
    }));
  }

  async updatePost(post: Post) {
    await this.esService.update({
      index: this.index,
      id: post.getId().toString(),
      body: {
        doc: this.postToElasticsearchBody(post),
      },
    });
  }

  async deletePost(postId: number) {
    await this.esService.delete({
      index: this.index,
      id: postId.toString(),
    });
  }
}
