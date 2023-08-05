import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { ServerlessNestjsApplicationFactory } from 'serverless-lambda-nestjs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

if (process.env.NX_CLI_SET) {
  bootstrap();
}

// Run Nestjs application in AWS Lambda
export const handler: APIGatewayProxyHandler = async (event, context) => {
  const app = new ServerlessNestjsApplicationFactory<AppModule>(AppModule, {
    // NestFactory.create's option object
    cors: {
      origin: '*',
      allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    },
  });
  const result = await app.run(event, context);
  return result;
};
