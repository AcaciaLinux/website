import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CodeModel } from '@ngstack/code-editor';
import { map, of, Subscription, switchMap } from 'rxjs';
import { BranchService } from '../shared/branch/branch.service';
import { EventService, EventType } from '../shared/event/event.service';
import { ToastService } from '../toasts-container/toast-service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  theme = 'vs-light';

  public cur_pkgbuild_name: string = "";
  private events_subscription: Subscription;
  private curCode: string = "";

  constructor(private route: ActivatedRoute, private location: Location, public branch: BranchService, private events: EventService, private toasts: ToastService) {
    this.route.params.subscribe(args => {
      this.cur_pkgbuild_name = args["pkgbuild"];
      this.branch
        .request("packagebuild&pkgname=" + args["pkgbuild"])
        .subscribe(res => {
          this.model.value = res.payload;
        })
    });

    //Subscribe to the submit event
    this.events_subscription = this.events.emitter.subscribe(val => {
      if (val == EventType.EDITOR_SUBMIT){
        let submit_res = this.submit();
        if (submit_res !== undefined){
          submit_res.subscribe();
        }
      }

      else if (val == EventType.EDITOR_RELEASEBUILD){
        this.releasebuild();
      }

      else if (val == EventType.EDITOR_CROSSBUILD){
        this.crossbuild();
      }

      else if (val == EventType.EDITOR_DELETE){
        this.delete();
      }
    });
  }

  submit(){
    if (this.curCode == ""){
      this.toasts.s_i("No change to packagebuild, skipped submission");
      return undefined;
    }

    return this.branch.checkauth()
      .pipe(switchMap(auth => {
        if (auth){
          return this.branch.submit(this.curCode).pipe(
            map(res => {
              if (res){
                this.curCode = "";
              }
              return res;
            }))
        } else {
          return of(false);
        }
      }));
  }

  releasebuild(){
    let submit_res = this.submit();

    //If no submission was done, request the build anyway
    if (submit_res === undefined){
      this.branch.releasebuild(this.cur_pkgbuild_name).subscribe();
    } else {
      submit_res.subscribe(ok => {
        if (ok){
          this.branch.releasebuild(this.cur_pkgbuild_name).subscribe();
        }
      });
    }
  }

  crossbuild(){
    let submit_res = this.submit();

    //If no submission was done, request the build anyway
    if (submit_res === undefined){
      this.branch.crossbuild(this.cur_pkgbuild_name).subscribe();
    } else {
      submit_res.subscribe(ok => {
        if (ok){
          this.branch.crossbuild(this.cur_pkgbuild_name).subscribe();
        }
      });
    }
  }

  delete(){
    this.branch.deletepkg(this.cur_pkgbuild_name).subscribe(ok => {
      if (ok)
        this.location.back();
    });
  }

  ngOnDestroy(){
    this.events_subscription.unsubscribe();
  }

  model: CodeModel = {
    language: 'shell',
    uri: 'package.bpb',
    value: '',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  onCodeChanged(value: string) {
    this.curCode = value;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
          this.submit();
          event.preventDefault();
      }
  }
}
