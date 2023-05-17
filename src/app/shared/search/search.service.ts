import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public emitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  public push(term: string) {
    this.emitter.emit(term);
  }

}
