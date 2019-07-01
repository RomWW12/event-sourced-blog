import { ICommand } from '@nestjs/cqrs';
import ArticleDto from '../../articles/article.dto';

export class CreateArticleCommand implements ICommand {
  constructor(
    public readonly articleDto: ArticleDto,
  ) {}

  
}
