import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventService, EventType } from 'src/app/shared/event/event.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent {

  public title: string = "";
  public body: string = "";
  @ViewChild('modalData', { static: false }) modalData: ElementRef | undefined;

  constructor(private modalService: NgbModal, private events: EventService){

  }

  show(title: string, body: string): NgbModalRef {
    this.title = title;
    this.body = body;
    return this.modalService.open(this.modalData, { backdrop: 'static' });
  }
}
