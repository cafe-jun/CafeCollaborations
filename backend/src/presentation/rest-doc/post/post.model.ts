import { PostStatus } from '@core/common/enums/post-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { RestApiModelPostImage } from './post-image.model';
import { RestApiModelPostOwner } from './post-owner.model';

export class RestApiModelPost {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: RestApiModelPostOwner })
  public owner: RestApiModelPostOwner;

  @ApiProperty({ type: RestApiModelPostImage })
  public image: RestApiModelPostImage;

  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string' })
  public content: string;

  @ApiProperty({ enum: PostStatus })
  public status: PostStatus;

  @ApiProperty({ type: 'number' })
  public createdAt: number;

  @ApiProperty({ type: 'number', required: false })
  public editedAt: number;

  @ApiProperty({ type: 'number', required: false })
  public publishedAt: number;
}
