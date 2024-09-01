import { BaseEntity } from '@core/common/entity/base.entity';
import { IsString } from 'class-validator';

export class CommentOwner extends BaseEntity<number> {
  @IsString()
  private readonly name: string;

  constructor({ id, name }: { id: number; name: string }) {
    super();
    this.id = id;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public static async create(id: number, name: string): Promise<CommentOwner> {
    const postOwner: CommentOwner = new CommentOwner({ id, name });
    await postOwner.validate();
    return postOwner;
  }
}
