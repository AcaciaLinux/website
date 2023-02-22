import { EventEmitter, Injectable } from '@angular/core';

export enum EventType{
  EDITOR_SUBMIT,
  EDITOR_RELEASEBUILD,
  EDITOR_CROSSBUILD,
  NONE
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public emitter: EventEmitter<EventType> = new EventEmitter<EventType>();

  constructor() { }

  public push(type: EventType){
    this.emitter.emit(type);
  }
}
