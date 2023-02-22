import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CodeModel } from '@ngstack/code-editor';
import { Subscription } from 'rxjs';
import { BranchService } from '../shared/branch/branch.service';
import { EventService, EventType } from '../shared/event/event.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  theme = 'vs-light';

  public cur_pkgbuild_name: string = "";
  private events_subscription: Subscription;

  constructor(private route: ActivatedRoute, public branch: BranchService, private events: EventService) {
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
        //Check authentication, if valid, submit
        this.branch.checkauth().subscribe(valid => {
          if (valid){
            console.log("Submitting packagebuild " + this.cur_pkgbuild_name + "...");
            this.branch.submit(this.model.value).subscribe();
          }
        });
      }

      else if (val == EventType.EDITOR_RELEASEBUILD){
        //Check authentication, if valid, submit
        this.branch.checkauth().subscribe(valid => {
          if (valid){
            console.log("Submitting packagebuild " + this.cur_pkgbuild_name + "...");

            //Submit the packagebuild
            this.branch.submit(this.model.value).subscribe(submitted => {
              if (submitted){

                //If submission is ok, request a releasebuild
                console.log("Requesting releasebuild of " + this.cur_pkgbuild_name + "...");
                this.branch.releasebuild(this.cur_pkgbuild_name).subscribe();
              }
            });
          }
        });
      }

      else if (val == EventType.EDITOR_CROSSBUILD){
        //Check authentication, if valid, submit
        this.branch.checkauth().subscribe(valid => {
          if (valid){
            console.log("Submitting packagebuild " + this.cur_pkgbuild_name + "...");

            //Submit the packagebuild
            this.branch.submit(this.model.value).subscribe(submitted => {
              if (submitted){

                //If submission is ok, request a crossbuild
                console.log("Requesting crossbuild of " + this.cur_pkgbuild_name + "...");
                this.branch.crossbuild(this.cur_pkgbuild_name).subscribe();
              }
            });
          }
        });
      }
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

  }
}
