import { EventEmitter, Injectable } from '@angular/core';
import { interval, Subscription } from 'rxjs';

export enum EventType{
  EDITOR_SUBMIT,
  EDITOR_RELEASEBUILD,
  EDITOR_CROSSBUILD,
  EDITOR_DELETE,
  DATA_REFRESH,
  NONE
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public emitter: EventEmitter<EventType> = new EventEmitter<EventType>();

  constructor() {
    const source = interval(5000);
    source.subscribe(val => {
        this.push(EventType.DATA_REFRESH);
      });
  }

  public push(type: EventType){
    this.emitter.emit(type);
  }
}
