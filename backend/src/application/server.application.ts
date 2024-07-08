import { NestFactory } from '@nestjs/core';
import { NestExpressApplication as NestApp } from '@nestjs/platform-express';
import { AppModule } from './api/di/app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ApiConfig } from '@infrastructure/config/api-config';

export class ServerApplication {
  public async start(): Promise<void> {
    const app: NestApp = await NestFactory.create<NestApp>(AppModule);
    this.buildAPIDocumentation(app);
    this.enableCors(app);
    await app.listen(ApiConfig.PORT);
  }

  private buildAPIDocumentation(app: NestApp): void {
    const title = 'NestJS Boilerplate API';
    const description = 'NestJS Boilerplate API Documentation';
    const version = '1.0.0';

    const options = new DocumentBuilder().setTitle(title).setDescription(description).setVersion(version).build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  private enableCors(app: NestApp) {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  // static method to create an instance
  public static create(): ServerApplication {
    return new ServerApplication();
  }
}
