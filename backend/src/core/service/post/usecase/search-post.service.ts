import { Post } from '@core/domain/post/entity/post';
import { SearchRequest } from '@elastic/elasticsearch/api/types';
import { Injectable } from '@nestjs/common';

import { ElasticsearchService } from '@nestjs/elasticsearch';

// interface PostSearchBody {
//   id: number;
//   title: string;
//   category: string;
//   content: string;
//   // 기타 필요한 필드들...
// }

@Injectable()
export class SearchPostService {
  private readonly index: string = 'post-index';

  constructor(private readonly esService: ElasticsearchService) {}

  async createIndex(posts: Post[]) {
    const checkIndex = await this.esService.indices.exists({ index: this.index });

    if (!checkIndex.body) {
      await this.esService.indices.create({
        index: this.index,
        body: {
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
        },
      });
      await this.indexAllPosts(posts);
    }
  }
  async indexAllPosts(posts: Post[]) {
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

  async search(query: string, paging: { pageNo: number; pageSize: number }, filters?: { category?: string; regionCode?: string }) {
    const body: SearchRequest['body'] = {
      from: (paging.pageNo - 1) * paging.pageSize,
      size: paging.pageSize,
      track_total_hits: true,
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
      (body.query.bool.filter as any[]).push({ term: { category: filters.category } });
    }

    if (filters?.regionCode) {
      (body.query.bool.filter as any[]).push({ term: { regionCode: filters.regionCode } });
    }

    const { body: result } = await this.esService.search({
      index: this.index,
      body,
    });
    console.log(result);
    const items = result.hits.hits.map((hit) => ({
      id: hit._source.id,
      title: hit._source.title,
      category: hit._source.category,
      content: hit._source.content,
      score: hit._score,
    }));
    return { items, totalCount: result.hits.total.value };
  }

  async updatePost(post: Post) {
    await this.esService.update({
      index: this.index,
      id: post.getId().toString(),
      body: {
        doc: this.postToElasticsearchBody(post),
      },
      refresh: true,
    });
  }

  async deletePost(postId: number) {
    await this.esService.delete({
      index: this.index,
      id: postId.toString(),
    });
  }
}
