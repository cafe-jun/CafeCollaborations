import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ElasticsearchModule, ElasticsearchService } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_NODE'),
          auth: {
            username: 'elastic',
            password: '2ZOL-5AJA7xu8cpck9Pf',
          },
          maxRetries: 10,
          requestTimeout: 60000,
          pingTimeout: 60000,
          sniffOnStart: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class SearchModule {}
