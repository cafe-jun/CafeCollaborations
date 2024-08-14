import { BaseEntity } from '@core/common/entity/base.entity';
import { IsString } from 'class-validator';

export class PostOwner extends BaseEntity<number> {
  @IsString()
  private readonly name: string;

  constructor(id: number, name: string) {
    super();
    this.id = id;
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public static async create(id: number, name: string): Promise<PostOwner> {
    const postOwner: PostOwner = new PostOwner(id, name);

    await postOwner.validate();
    return postOwner;
  }
}
