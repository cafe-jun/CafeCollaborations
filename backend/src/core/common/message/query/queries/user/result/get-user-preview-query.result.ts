export class GetUserPreviewQueryResult {
  public readonly id: number;
  public readonly name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
  public static create(id: number, name: string): GetUserPreviewQueryResult {
    return new GetUserPreviewQueryResult(id, name);
  }
}
