import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { map } from 'rxjs';
import { BranchService } from 'src/app/shared/branch/branch.service';
import { PkgBuildTemplate, TemplateResponse } from 'src/app/shared/classes/pkgbuildtemplate';
import { ConfigService } from 'src/app/shared/config/config.service';
import { ToastService } from 'src/app/toasts-container/toast-service';

@Component({
  selector: 'app-pkg-build-modal',
  templateUrl: './pkg-build-modal.component.html',
  styleUrls: ['./pkg-build-modal.component.css']
})
export class PkgBuildModalComponent {
  @ViewChild('modalData', { static: false }) modalData: ElementRef | undefined;

  public templates?: PkgBuildTemplate[];

  constructor(private modalService: NgbModal, private toasts: ToastService, private http: HttpClient, private config: ConfigService, private branch: BranchService, private router: Router) {
    http.get(config.getTemplatesURL())
      .pipe(map<any, TemplateResponse>(v => v))
      .subscribe(v => {
        this.templates = v.templates;
      });
  }

  show(): NgbModalRef {
    return this.modalService.open(this.modalData, { backdrop: "static", size: "xl" });
  }

  create_pkg_build(modal: any, template: string, name: string, version: string, desc: string, rver: string, source: string) {
    const template_id: number = +template;

    if (this.templates === undefined) {
      modal.close(false);
      return;
    }

    this.http.get(this.templates[template_id].url, { responseType: "text" }).subscribe(pkgbuild => {
      pkgbuild = pkgbuild.replaceAll("TEMPLATE_NAME", name);
      pkgbuild = pkgbuild.replaceAll("TEMPLATE_VERSION", version);
      pkgbuild = pkgbuild.replaceAll("TEMPLATE_DESCRIPTION", desc);
      pkgbuild = pkgbuild.replaceAll("TEMPLATE_RELV", rver);
      pkgbuild = pkgbuild.replaceAll("TEMPLATE_SOURCE", source);

      this.branch.submit(pkgbuild).subscribe(ok => {
        if (ok) {
          this.router.navigate(["/editor/", name]);
          modal.close(true);
        }
      })
    });
  }
}
