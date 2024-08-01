import { Module } from '@nestjs/common';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
      auth: {
        username: 'admin',
        password: 'admin',
      },
      cloud: {
        id: '123',
      },
      maxRetries: 10,
      requestTimeout: 60000,
      pingTimeout: 60000,
      sniffOnStart: true,
    }),
  ],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class SearchModule {}
