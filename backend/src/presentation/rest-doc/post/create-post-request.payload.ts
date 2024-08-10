import { DurationType } from '@core/common/enums/duration-type.enum';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { RecruitMember } from '@core/common/enums/recruite-member.enum';
import { Region } from '@core/common/enums/region.enum';
import { ApiProperty } from '@nestjs/swagger';

export class RestCreatePostRequestPayload {
  @ApiProperty({ type: 'string' })
  public title: string;

  @ApiProperty({ type: 'string', required: false })
  public imageId: string;

  @ApiProperty({ type: 'string', required: false })
  public content: string;

  @ApiProperty({ type: 'string', required: false })
  public category: string;

  @ApiProperty({ type: 'enum', enum: Region.getValues(), required: false })
  public region: Region;

  @ApiProperty({ type: 'enum', enum: DurationType.getValues(), required: false })
  public durationType: DurationType;

  @ApiProperty({ type: 'enum', enum: RecruitMember.getValues(), required: false })
  public recruitMember: RecruitMember;

  @ApiProperty({ type: 'enum', enum: PostStatus, required: false })
  public status: PostStatus;
}
