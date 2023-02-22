import { Component, ElementRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BranchService } from 'src/app/shared/branch/branch.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {

  public hideLoginButton: boolean = false;
  public closeModal: string = "Close Modal!";
  @ViewChild('btnLogin', { static: false }) btnLogin: ElementRef<HTMLButtonElement> | undefined;

  constructor(private modalService: NgbModal, public branchService: BranchService) {}

  public show(modalData: any){
    this.modalService.open(modalData, {ariaLabelledBy: 'modal-basic-title'});
  }

  //Calls BranchService::authenticate and dismisses the dialog
  authenticate(username: string, password: string){
    //Just let the call go, subscribe it but do nothing...
    this.branchService.authenticate(username, password).subscribe();

    //And dismiss the dialog
    this.modalService.dismissAll();
  }

  //Calls BranchService::logoff() to log off
  logoff(){
    this.branchService.checkauth().subscribe(authenticated => {
      if (authenticated){
        this.branchService.logoff();
      }
    });
  }
}
