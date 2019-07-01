import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './articles/article.entity';
import { CreateArticleHandler } from './commands/handlers/create-article.handler';
import { EventSaga } from './events/event.saga';

export const CommandHandlers = [CreateArticleHandler];
export const EventHandlers = [CreateArticleHandler];

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
    EventSaga,
    ...CommandHandlers,
  ],
})
export class AppModule {}
