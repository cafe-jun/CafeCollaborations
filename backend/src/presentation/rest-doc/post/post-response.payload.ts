import { ApiProperty } from '@nestjs/swagger';
import { RestApiModelPostImage } from './post-image.model';
import { RestApiResponse } from '../common/rest.response';

export class RestApiResponsePost extends RestApiResponse {
  @ApiProperty({ type: RestApiModelPostImage })
  public data: RestApiModelPostImage;
}
