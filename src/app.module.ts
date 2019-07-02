import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './articles/article.entity';
import { Event } from './events/event.entity';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { EventSaga } from './events/event.saga';
import { ArticleRepository } from './articles/article.repository';
import { Catalog } from './catalog/catalog.entity';
import { AddIdToCatalogHandler } from './commands/handlers/add-it-to-catalog.handler';

export const CommandHandlers = [CreateArticleHandler,  AddIdToCatalogHandler];

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
    TypeOrmModule.forFeature([Article, Event, Catalog]),
    CqrsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ArticleRepository,
    EventSaga,
    ...CommandHandlers,
  ],
})
export class AppModule {}
