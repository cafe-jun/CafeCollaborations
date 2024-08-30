export class PostDITokens {
  public static readonly PostUseCase: unique symbol = Symbol('PostUseCase');

  // Use-cases
  public static readonly CreatePostUseCase: unique symbol = Symbol('CreatePostUseCase');
  public static readonly EditPostUseCase: unique symbol = Symbol('EditPostUseCase');
  public static readonly GetPostListUseCase: unique symbol = Symbol('GetPostListUseCase');
  public static readonly GetPostDetailUseCase: unique symbol = Symbol('GetPostDetailUseCase');
  public static readonly PublishPostUseCase: unique symbol = Symbol('PublishPostUseCase');
  public static readonly RemovePostUseCase: unique symbol = Symbol('RemovePostUseCase');
  public static readonly GetAllPostListUseCase: unique symbol = Symbol('GetAllPostListUseCase');
  public static readonly SearchPostListUseCase: unique symbol = Symbol('SearchPostListUseCase');

  // Handlers

  public static readonly PostImageRemovedEventHandler: unique symbol = Symbol('PostImageRemovedEventHandler');

  // Repositories

  public static readonly PostWriteRepository: unique symbol = Symbol('PostWriteRepository');
  public static readonly PostSearchRepository: unique symbol = Symbol('PostSearchRepository');
  public static readonly PostReadRepository: unique symbol = Symbol('PostReadRepository');
}
