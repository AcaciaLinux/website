import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditorComponent } from 'src/app/editor/editor.component';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { EventService, EventType } from 'src/app/shared/event/event.service';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.css']
})
export class EditorControlsComponent {

  constructor(private router: Router, private events: EventService, private branch: BranchService){
  }

  do_submit(){
    this.events.push(EventType.EDITOR_SUBMIT);
  }

  do_releasebuild(){
    this.events.push(EventType.EDITOR_RELEASEBUILD);
  }

  do_crossbuild(){
    this.events.push(EventType.EDITOR_CROSSBUILD);
  }

  shouldShow(route: string){
    return this.router.url.includes(route) && this.branch.config.authKey != '';
  }
}
