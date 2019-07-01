import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { CreateArticleCommand } from '../implementations/article-created.command';
import { Article } from '../../articles/article.entity';
import { AppService } from '../../app.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  execute(command: CreateArticleCommand): Promise<Article> {
    const article = this.articleRepository.create(command.articleDto);
    return this.articleRepository.save(article);
  }
}
