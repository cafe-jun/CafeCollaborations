export class CommentDITokens {
  public static readonly CommentUseCase: unique symbol = Symbol('CommentUseCase');

  // Use-cases
  public static readonly CreateCommentUseCase: unique symbol = Symbol('CreateCommentUseCase');
  public static readonly EditCommentUseCase: unique symbol = Symbol('EditCommentUseCase');
  public static readonly GetCommentListUseCase: unique symbol = Symbol('GetCommentListUseCase');
  public static readonly GetCommentDetailUseCase: unique symbol = Symbol('GetCommentDetailUseCase');
  public static readonly PublishCommentUseCase: unique symbol = Symbol('PublishCommentUseCase');
  public static readonly RemoveCommentUseCase: unique symbol = Symbol('RemoveCommentUseCase');
  public static readonly GetAllCommentListUseCase: unique symbol = Symbol('GetAllCommentListUseCase');
  public static readonly SearchCommentListUseCase: unique symbol = Symbol('SearchCommentListUseCase');

  // Handlers
  public static readonly CommentImageRemovedEventHandler: unique symbol = Symbol('CommentImageRemovedEventHandler');

  // Repositories

  public static readonly CommentWriteRepository: unique symbol = Symbol('CommentWriteRepository');
  public static readonly CommentSearchRepository: unique symbol = Symbol('CommentSearchRepository');
  public static readonly CommentReadRepository: unique symbol = Symbol('CommentReadRepository');
}
