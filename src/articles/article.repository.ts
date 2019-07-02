import { Injectable } from '@nestjs/common';
import { Article } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../events/event.entity';
import { ArticleEvents } from '../events/namespace';

const recreateEvent = (event: Event) => {
  return new (ArticleEvents as any)[event.className](event.payload);
}

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(Event) private readonly EventRepository: Repository<Event>) {}

  async findById(aggregateId: Article['id']): Promise<Article> {
    const articleHistory: Event[] = await this.EventRepository.find({ where: { aggregateId } });
    const articleHistoryEvents = articleHistory.map(recreateEvent);

    const article = new Article(); 
    article.loadFromHistory(articleHistoryEvents);

    return article;
  }
}
