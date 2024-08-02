import { HttpAuth } from '@application/auth/decorator/http-auth.decorator';
import { HttpUser } from '@application/auth/decorator/http-user.decorator';
import { RestUserPayload } from '@application/auth/type/http-auth.type';
import { PostDITokens } from '@core/domain/post/di/post-di.token';
import { PostUseCaseDto } from '@core/domain/post/usecase/dto/post-usecase.dto';
import {
  CreatePostUseCase,
  EditPostUseCase,
  GetAllPostUseCase,
  GetPostListUseCase,
  GetPostUseCase,
  PublishPostUseCase,
  RemovePostUseCase,
  SearchPostUseCase,
} from '@core/domain/post/usecase/post.usecase';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EditPostAdapter } from '@infrastructure/adapter/usecase/post/edit-post.adapter';
import { RestEditPostRequestPayload } from './rest-doc/post/edit-post-request.payload';
import { RestApiResponsePost } from './rest-doc/post/post-response.payload';

import { RestCreatePostRequestPayload } from './rest-doc/post/create-post-request.payload';
import { CreatePostAdapter } from '@infrastructure/adapter/usecase/post/create-post.adapter';
import { CoreApiResponse } from '@core/common/response/core-api.response';
import { RestGetPostListQuery } from './rest-doc/post/get-post-list.query';
import { GetPostListAdapter } from '@infrastructure/adapter/usecase/post/get-post-list.adapter';
import { GetPostAdapter } from '@infrastructure/adapter/usecase/post/get-post.adapter';
import { PostStatus } from '@core/common/enums/post-status.enum';
import { PublishPostAdapter } from '@infrastructure/adapter/usecase/post/publish-post.adapter';
import { RemovePostAdapter } from '@infrastructure/adapter/usecase/post/remove-post.adapter';
import { GetAllPostListAdapter } from '@infrastructure/adapter/usecase/post/get-all-post-list.adapter';
import { RestGetAllPostListQuery } from './rest-doc/post/get-all-post-list.query';
import { RestApiModelPost } from './rest-doc/post/post.model';

@Controller('post')
@ApiTags('posts')
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

    @Inject(PostDITokens.PublishPostUseCase)
    private readonly publishPostUsecase: PublishPostUseCase,

    @Inject(PostDITokens.RemovePostUseCase)
    private readonly removePostUseCase: RemovePostUseCase,

    @Inject(PostDITokens.GetAllPostListUseCase)
    private readonly getAllPostListUseCase: GetAllPostUseCase,

    // @Inject(PostDITokens.SearchPostListUseCase)
    // private readonly searchPostListUseCase: SearchPostUseCase,
  ) {}

  @Post()
  @HttpAuth()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: RestCreatePostRequestPayload })
  @ApiBearerAuth()
  public async createPost(@HttpUser() user: RestUserPayload, @Body() body: RestCreatePostRequestPayload) {
    const adapter: CreatePostAdapter = await CreatePostAdapter.create({
      executorId: user.id,
      title: body.title,
      content: body.content,
      imageId: body.imageId,
    });
    const createPost: PostUseCaseDto = await this.createPostUseCase.execute(adapter);
    return CoreApiResponse.success(createPost, 'Post created successfully');
  }

  @Put(':postId')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiBody({ type: RestEditPostRequestPayload })
  @ApiResponse({ status: HttpStatus.OK, type: RestApiResponsePost })
  public async editPost(@HttpUser() user: RestUserPayload, @Body() body: RestEditPostRequestPayload, @Param('postId', ParseIntPipe) postId: number) {
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

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: RestApiModelPost })
  public async getAllPostsList(@Query() query: RestGetAllPostListQuery): Promise<CoreApiResponse<PostUseCaseDto[]>> {
    // this.searchPostListUseCase.execute();
    const adapter: GetAllPostListAdapter = await GetAllPostListAdapter.create({
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    });
    // await this.searchPostListUseCase.execute();
    const result = await this.getAllPostListUseCase.execute(adapter);
    return CoreApiResponse.success(result.items, 'Posts fetched successfully', result.meta);
  }

  @Get('mine')
  // @HttpAuth(UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  // @ApiResponse({ status: HttpStatus.OK, type: RestApiResponsePostList })
  public async getMinePostList(@HttpUser() user: RestUserPayload): Promise<CoreApiResponse<PostUseCaseDto[]>> {
    const adapter: GetPostListAdapter = await GetPostListAdapter.create({
      executorId: user.id,
      ownerId: user.id,
    });
    const posts: PostUseCaseDto[] = await this.getPostListUseCase.execute(adapter);
    // this.setFileStorageBasePath(posts);

    return CoreApiResponse.success(posts);
  }

  @Get(':postId')
  // @HttpAuth(UserRole.AUTHOR, UserRole.ADMIN, UserRole.GUEST)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  // @ApiResponse({ status: HttpStatus.OK, type: HttpRestApiResponsePostList })
  public async getPost(@HttpUser() user: RestUserPayload, @Param('postId') postId: number) {
    const adapter: GetPostAdapter = await GetPostAdapter.create({ executorId: user.id, postId: postId });
    const post: PostUseCaseDto = await this.getPostUseCase.execute(adapter);
    return CoreApiResponse.success(post);
  }

  @Post(':postId/publish')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  // @ApiResponse({ status: HttpStatus.OK, type: RestApiResponsePostList })
  public async publishPost(@HttpUser() user: RestUserPayload, @Param('postId') postId: number): Promise<CoreApiResponse<PostUseCaseDto>> {
    const adapter: PublishPostAdapter = await PublishPostAdapter.create({ executorId: user.id, postId: postId });
    const post: PostUseCaseDto = await this.publishPostUsecase.execute(adapter);
    return CoreApiResponse.success(post);
  }

  @Delete(':postId')
  // @HttpAuth(UserRole.AUTHOR)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  public async removePost(@HttpUser() user: RestUserPayload, @Param('postId') postId: number): Promise<CoreApiResponse<void>> {
    const adapter: RemovePostAdapter = await RemovePostAdapter.create({ executorId: user.id, postId: postId });
    await this.removePostUseCase.execute(adapter);
    return CoreApiResponse.success();
  }

  // private setFileStorageBasePath(posts: PostUseCaseDto[]): void {
  //   posts.forEach((post: PostUseCaseDto) => {
  //     if (post.image) {
  //       post.image.url = resolve(FileStorageConfig.BASE_PATH, post.image.url);
  //     }
  //   });
  // }
}
