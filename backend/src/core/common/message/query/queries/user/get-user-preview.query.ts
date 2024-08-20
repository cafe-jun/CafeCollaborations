import { RepositoryFindOptions } from '@core/common/persistence/repoistory.option';

export class GetUserPreviewQuery {
  by: { id: number };

  options?: RepositoryFindOptions;

  private constructor(by: { id: number }, options?: RepositoryFindOptions) {
    this.by = by;
    this.options = options;
  }

  public static create(by: { id: number }, options?: RepositoryFindOptions): GetUserPreviewQuery {
    return new GetUserPreviewQuery(by, options);
  }
}
