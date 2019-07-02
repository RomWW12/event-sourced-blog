import { Entity } from 'typeorm/decorator/entity/Entity';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Column } from 'typeorm';
import { AggregateRoot } from '@nestjs/cqrs';
import * as uuidv4 from 'uuid/v4';

import { ArticleCreatedEvent } from '../events/article-created.event';

export class Article extends AggregateRoot {
  id: string;
  name: string;
  content: string;

  onArticleCreatedEvent(event: ArticleCreatedEvent) {
    this.id = event.getAggregateId;
    this.name = event.getName;
    this.content = event.getContent;
  }
}

export const createArticle = ({ name, content }) => {
  const article = new Article();
  const articleCreatedEvent = new ArticleCreatedEvent({ aggregateId: uuidv4(), name, content });
  article.apply(articleCreatedEvent);

  return article;
};
