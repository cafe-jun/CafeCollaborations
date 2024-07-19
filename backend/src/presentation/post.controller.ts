import { HttpAuth } from '@application/auth/decorator/http-auth.decorator';
import { HttpUser } from '@application/auth/decorator/http-user.decorator';
import { HttpUserPayload } from '@application/auth/type/http-auth.type';
import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import { CreatePostUseCase, EditPostUseCase, GetPostListUseCase, GetPostUseCase } from '@core/domain/post/usecase/post.usecase';
import { Body, Controller, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { EditPostAdapter } from '@infrastructure/adapter/usecase/post/edit-post.adapter';
import { RestEditPostRequestPayload } from './rest-doc/post/edit-post-request.payload';
import { RestApiResponsePost } from './rest-doc/post/post-response.payload';

import { RestCreatePostRequestPayload } from './rest-doc/post/create-post-request.payload';
import { CreatePostAdapter } from '@infrastructure/adapter/usecase/post/create-post.adapter';
import { CoreApiResponse } from '@core/common/response/core-api.response';

@Controller('post')
export class PostController {
  constructor(
    @Inject(PostDITokens.CreatePostUseCase)
    private readonly createPostUseCase: CreatePostUseCase,
    @Inject(PostDITokens.GetPostUseCase)
    private readonly getPostUseCase: GetPostUseCase,
    @Inject(PostDITokens.GetPostListUseCase)
    private readonly getPostListUseCase: GetPostListUseCase,
    @Inject(PostDITokens.EditPostUseCase)
    private readonly editPostUseCase: EditPostUseCase,
  ) {}

  @Post()
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RestCreatePostRequestPayload })
  @ApiBearerAuth()
  public async createPost(@HttpUser() user: HttpUserPayload, @Body() body: RestCreatePostRequestPayload) {
    const adapter: CreatePostAdapter = await CreatePostAdapter.create({
      executorId: user.id,
      title: body.title,
      content: body.content,
      imageId: body.imageId,
    });
    const createPost: PostUseCaseDto = await this.createPostUseCase.execute(adapter);
    return CoreApiResponse.success(createPost);
  }

  @Put(':postId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: RestEditPostRequestPayload })
  @ApiResponse({ status: HttpStatus.OK, type: RestApiResponsePost })
  public async editPost(@HttpUser() user: HttpUserPayload, @Body() body: RestEditPostRequestPayload, @Param('postId', ParseIntPipe) postId: number) {
    const adapter: EditPostAdapter = await EditPostAdapter.create({
      executorId: user.id,
      postId: postId,
      title: body.title,
      content: body.content,
      imageId: body.imageId,
    });

    const editedPost: PostUseCaseDto = await this.editPostUseCase.execute(adapter);

    return CoreApiResponse.success(editedPost);
  }

  // @Get()
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // public async getPostList(@HttpUser() user: HttpUserPayload, @Query() query: RestGetPostListQuery) {
  //   const posts: PostUseCaseDto[] = await this.getPostListUseCase.execute(adapter);
  //   // this.setFileStorageBasePath(posts);

  //   // return CoreApiResponse.success(posts);
  // }

  // @Get('mine')
  // // @HttpAuth(UserRole.AUTHOR)
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponsePostList })
  // public async getMinePostList(@HttpUser() user: HttpUserPayload) {
  //   // const adapter: GetPostListAdapter = await GetPostListAdapter.new({
  //   //   executorId: user.id,
  //   //   ownerId: user.id,
  //   // });
  //   const posts: PostUseCaseDto[] = await this.getPostListUseCase.execute(adapter);
  //   // this.setFileStorageBasePath(posts);

  //   // return CoreApiResponse.success(posts);
  // }

  // @Get(':postId')
  // // @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST)
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponsePostList })
  // public async getPost(@HttpUser() user: HttpUserPayload, @Param('postId') postId: string) {
  //   const adapter: GetPostAdapter = await GetPostAdapter.new({ executorId: user.id, postId: postId });
  //   const post: PostUseCaseDto = await this.getPostUseCase.execute(adapter);
  //   // this.setFileStorageBasePath([post]);

  //   return CoreApiResponse.success(post);
  // }

  // @Post(':postId/publish')
  // @HttpAuth(UserRole.AUTHOR)
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponsePostList })
  // public async publishPost(@HttpUser() user: HttpUserPayload, @Param('postId') postId: string): Promise<CoreApiResponse<PostUseCaseDto>> {
  //   const adapter: PublishPostAdapter = await PublishPostAdapter.new({ executorId: user.id, postId: postId });
  //   const post: PostUseCaseDto = await this.publishPostUseCase.execute(adapter);
  //   this.setFileStorageBasePath([post]);

  //   return CoreApiResponse.success(post);
  // }

  // @Delete(':postId')
  // @HttpAuth(UserRole.AUTHOR)
  // @HttpCode(HttpStatus.OK)
  // @ApiBearerAuth()
  // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponsePostList })
  // public async removePost(@HttpUser() user: HttpUserPayload, @Param('postId') postId: string): Promise<CoreApiResponse<void>> {
  //   const adapter: RemovePostAdapter = await RemovePostAdapter.new({ executorId: user.id, postId: postId });
  //   await this.removePostUseCase.execute(adapter);

  //   return CoreApiResponse.success();
  // }

  // private setFileStorageBasePath(posts: PostUseCaseDto[]): void {
  //   posts.forEach((post: PostUseCaseDto) => {
  //     if (post.image) {
  //       post.image.url = resolve(FileStorageConfig.BASE_PATH, post.image.url);
  //     }
  //   });
  // }
}
