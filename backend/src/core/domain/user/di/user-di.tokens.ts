export class UserDiTokens {
  public static readonly CreateUserUseCase: unique symbol = Symbol('CreateUserUseCase');
  public static readonly GetUserUseCase: unique symbol = Symbol('GetUserUseCase');
  public static readonly GetUserPreviewQueryHandler: unique symbol = Symbol('GetUserPreviewQueryHandler');
  public static readonly UserRepository: unique symbol = Symbol('UserRepository');
}
