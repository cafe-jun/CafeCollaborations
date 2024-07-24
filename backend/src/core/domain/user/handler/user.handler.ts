import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/get-user-preview.query';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';
import { QueryHandler } from '@core/common/message/query/query.handler';

export interface GetUserPreviewQueryHandler extends QueryHandler<GetUserPreviewQuery, GetUserPreviewQueryResult> {}
