import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';
import { EventService, EventType } from '../shared/event/event.service';

class Artifact{
  public name: string = "";
  public desc: string = "";
  public url: string = "";
}

class Category{
  public name: string = "";
  public artifacts: Artifact[] = new Array();
}

class Artifacts{
  public version: string = "";
  public categories: Category[] = new Array();
}

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent {

  public artifacts?: Artifacts;
  private subscription: Subscription;

  constructor(private config: ConfigService, private http: HttpClient, private events: EventService){
    this.subscription = this.events.emitter.subscribe(event => {
      if (event == EventType.DATA_REFRESH){
        this.updateData();
      }
    });
    this.updateData();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateData(){
    this.http.get(this.config.getArtifactsURL())
      .pipe(map<any, Artifacts>(data => data))
      .subscribe(
        data => this.artifacts = data
      )
  }
}
