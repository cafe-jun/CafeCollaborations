import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchPostService } from '@core/service/post/usecase/search-post.service';

@Module({
  imports: [
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE,
    }),
  ],
  providers: [SearchPostService],
  exports: [SearchPostService],
})
export class SearchModule {}
