import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/modals/confirm-modal/confirm-modal.component';
import { PkgBuildModalComponent } from 'src/app/modals/pkg-build-modal/pkg-build-modal.component';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { EventService, EventType } from 'src/app/shared/event/event.service';

@Component({
  selector: 'app-editor-controls',
  templateUrl: './editor-controls.component.html',
  styleUrls: ['./editor-controls.component.css']
})
export class EditorControlsComponent {

  constructor(private router: Router, private events: EventService, private branch: BranchService, private modals: NgbModal) {
  }

  do_submit() {
    this.events.push(EventType.EDITOR_SUBMIT);
  }

  do_releasebuild() {
    this.events.push(EventType.EDITOR_RELEASEBUILD);
  }

  do_crossbuild() {
    this.events.push(EventType.EDITOR_CROSSBUILD);
  }

  do_new_pkgbuild(mod: PkgBuildModalComponent) {
    mod.show().result.then();
  }

  do_delete(mod: ConfirmModalComponent) {
    mod.show(
      "Confirmation",
      "Do you really want to delete this package build and its resulted packages?"
    ).result.then(r => {
      if (r !== undefined) {
        //Seems dumb, but it could be anything...
        if (r == true) {
          this.events.push(EventType.EDITOR_DELETE);
        }
      }
      return true;
    });
  }

  shouldShow(route: string) {
    return this.router.url.includes(route) && this.branch.config.authKey != '';
  }
}
