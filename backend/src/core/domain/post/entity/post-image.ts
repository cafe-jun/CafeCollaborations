import { BaseEntity } from '@core/common/entity/base.entity';
import { IsString } from 'class-validator';

export class PostImage extends BaseEntity<number> {
  @IsString()
  private readonly relativePath: string;

  constructor(id: number, relativePath: string) {
    super();
    this.id = id;
    this.relativePath = relativePath;
  }

  public getRelativePath(): string {
    return this.relativePath;
  }

  public static async create(id: number, relativePath: string): Promise<PostImage> {
    const postImage: PostImage = new PostImage(id, relativePath);
    await postImage.validate();
    return postImage;
  }
}
