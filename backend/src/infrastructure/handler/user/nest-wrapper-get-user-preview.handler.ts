import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/get-user-preview.query';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';
import { Optional } from '@core/common/type/common.types';
import { UserDiTokens } from '@core/domain/user/di/user-di.tokens';
import { GetUserPreviewQueryHandler } from '@core/domain/user/handler/user.handler';
import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserPreviewQuery)
export class NestWrapperGetUserPreviewQueryHandler implements IQueryHandler<GetUserPreviewQuery> {
  constructor(
    @Inject(UserDiTokens.GetUserPreviewQueryHandler)
    private readonly handleService: GetUserPreviewQueryHandler,
  ) {}
  async execute(query: GetUserPreviewQuery): Promise<Optional<GetUserPreviewQueryResult>> {
    const result = await this.handleService.handle(query);
    return result;
  }
}
