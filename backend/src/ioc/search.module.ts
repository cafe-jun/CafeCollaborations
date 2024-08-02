import { Module } from '@nestjs/common';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';
import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { PrismaToken } from './infrastructure.module';
import { PrismaService } from 'nestjs-prisma';
import { PrismaPostRepository } from '@infrastructure/adapter/persistence/prisma/repository/post/prisma.post.repository';
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
