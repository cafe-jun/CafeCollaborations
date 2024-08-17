import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/get-user-preview.query';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';
import { Optional } from '@core/common/type/common.types';
import { User } from '@core/domain/user/entity/user';
import { GetUserPreviewQueryHandler } from '@core/domain/user/handler/user.handler';
import { UserRepositoryPort } from '@core/domain/user/port/persistence/user.repository.port';
import { isEmpty } from '@shared/data.helper';

export class HandleGetUserPreviewQueryService implements GetUserPreviewQueryHandler {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  public async handle(query: GetUserPreviewQuery): Promise<Optional<GetUserPreviewQueryResult>> {
    const user: Optional<User> = await this.userRepository.findUser(query.by, query.options);
    if (isEmpty(user)) {
      return null;
    }
    return GetUserPreviewQueryResult.create(user.getId(), user.getName());
  }
}
