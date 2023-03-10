import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { PackagesComponent } from './packages/packages.component';
import { PackagebuildsComponent } from './packagebuilds/packagebuilds.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { HomeComponent } from './home/home.component';
import { ConfigService } from './shared/config/config.service';
import { HttpClientModule } from '@angular/common/http';
import { BuildJobsComponent } from './admin/build-jobs/build-jobs.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { EditorComponent } from './editor/editor.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { EditorControlsComponent } from './controls/editor-controls/editor-controls.component';
import { ControlsComponent } from './controls/controls.component';
import { CookieService } from 'ngx-cookie-service';
import { JobsControlsComponent } from './controls/jobs-controls/jobs-controls.component';
import { LogViewModalComponent } from './modals/log-view-modal/log-view-modal.component';
import { ToastsContainer } from './toasts-container/toasts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PackagesComponent,
    PackagebuildsComponent,
    DownloadsComponent,
    HomeComponent,
    BuildJobsComponent,
    EditorComponent,
    LoginModalComponent,
    EditorControlsComponent,
    ControlsComponent,
    JobsControlsComponent,
    LogViewModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'packagebuilds', component: PackagebuildsComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/jobs', component: BuildJobsComponent },
      { path: 'editor/:pkgbuild', component: EditorComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ]),
    NgbModule,
    ToastsContainer,
    CodeEditorModule.forRoot({
      baseUrl: 'assets/monaco',
      typingsWorkerUrl: 'assets/workers/typings-worker.js'
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
