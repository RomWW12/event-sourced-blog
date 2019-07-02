import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArticleCreatedEvent } from './article-created.event';
import { Event } from './event.entity';
import { getRepository } from 'typeorm';
import { AddIdToCatalogCommand } from '../commands/implementations/add-it-to-catalog.command';

@Injectable()
export class EventSaga {
  @Saga()
  eventPublished = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(ofType(ArticleCreatedEvent), map(event =>  {
      const storedEvent = new Event();
      storedEvent.payload = event;
      storedEvent.aggregateId = event.getAggregateId;
      const {constructor} = Object.getPrototypeOf(event);
      storedEvent.className = constructor.name;
      getRepository(Event).save(storedEvent);
      return null;
    }));
  }

  @Saga()
  entityCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(ofType(ArticleCreatedEvent), map(event => {
      return new AddIdToCatalogCommand('article', event.getAggregateId);
    }));
  }
}
