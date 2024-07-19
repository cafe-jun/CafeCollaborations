import { NestFactory } from '@nestjs/core';
import { NestExpressApplication as NestApp } from '@nestjs/platform-express';
import { AppModule } from '../ioc/app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ApiConfig } from '@infrastructure/config/api-config';
import { PrismaService } from 'nestjs-prisma';
import cookieParser from 'cookie-parser';

export class ServerApplication {
  public async start(): Promise<void> {
    const app: NestApp = await NestFactory.create<NestApp>(AppModule);
    this.setCookieParser(app);
    this.prismaEventEmit(app);
    this.buildAPIDocumentation(app);
    this.enableCors(app);
    await app.listen(ApiConfig.PORT);
  }
  private prismaEventEmit(app: NestApp): void {
    const prismaService: PrismaService = app.get(PrismaService);
    prismaService.$on('query', (event) => {
      console.log(event);
    });
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

  private setCookieParser(app: NestApp) {
    app.use(cookieParser());
  }

  // static method to create an instance
  public static create(): ServerApplication {
    return new ServerApplication();
  }
}
