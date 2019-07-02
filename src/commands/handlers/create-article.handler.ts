import { ICommandHandler, CommandHandler, EventPublisher } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/article-created.command';
import { Article, createArticle } from '../../articles/article.entity';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    private readonly publisher: EventPublisher,
  ) {}

  execute(command: CreateArticleCommand): Promise<Article> {
    let article = createArticle(command.articleDto);
    article = this.publisher.mergeObjectContext(article);
    article.commit();
    return Promise.resolve(article);
  }
}
