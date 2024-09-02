import { PostRepositoryPort } from '@core/domain/post/port/persistence/post.repository.port';
import { CreateCommentUseCase } from '@core/domain/comment/usecase/comment.usecase';
import { CreateCommentPort } from '@core/domain/comment/port/comment.port';
import { CoreAssert } from '@core/common/util/assert/core.assert';
import { Exception } from '@core/common/exception/exception';
import { CommonMsg } from '@core/common/response/message/common-message';
import { CommentRepositoryPort } from '@core/domain/comment/port/persistence/comment.repository.port';
import { Comment } from '@core/domain/comment/entity/comment';
import { CommentOwner } from '@core/domain/comment/entity/comment-owner';
import { QueryBusPort } from '@core/common/port/message/query-bus.port';
import { GetUserPreviewQuery } from '@core/common/message/query/queries/user/get-user-preview.query';
import { GetUserPreviewQueryResult } from '@core/common/message/query/queries/user/result/get-user-preview-query.result';

export class CreateCommentService implements CreateCommentUseCase {
  constructor(
    //preview 만들기
    private readonly postRepository: PostRepositoryPort,
    private readonly commentRepository: CommentRepositoryPort,
    private readonly queryBus: QueryBusPort,
  ) {}

  async execute(payload: CreateCommentPort): Promise<{ id: number }> {
    const owner: GetUserPreviewQueryResult = CoreAssert.notEmpty(
      await this.queryBus.sendQuery(GetUserPreviewQuery.create({ id: payload.executorId })),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'Comment Owner not Found' }),
    );
    CoreAssert.isEmpty(
      await this.postRepository.findPostById({ id: payload.postId }),
      Exception.create({ code: CommonMsg.ENTITY_NOT_FOUND_ERROR, overrideMessage: 'PostId not Found' }),
    );
    const comment: Comment = await Comment.create({
      owner: new CommentOwner({ id: payload.executorId, name: owner.name }),
      postId: payload.postId,
      content: payload.content,
      createdAt: new Date(),
    });

    const saveComment = await this.commentRepository.addComment(comment);
    return { id: saveComment.id };
  }
}
