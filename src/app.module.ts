import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule, CommandBus } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './articles/article.entity';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { ModuleRef } from '@nestjs/core';

export const CommandHandlers = [CreateArticleHandler];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'romainmarquant',
      password: '',
      database: 'croutedb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Article]),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...CommandHandlers,
  ],
})
export class AppModule {}
