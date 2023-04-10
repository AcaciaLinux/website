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
import { HttpClientModule } from '@angular/common/http';
import { BuildJobsComponent } from './admin/build-jobs/build-jobs.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { EditorControlsComponent } from './controls/editor-controls/editor-controls.component';
import { ControlsComponent } from './controls/controls.component';
import { CookieService } from 'ngx-cookie-service';
import { JobsControlsComponent } from './controls/jobs-controls/jobs-controls.component';
import { LogViewModalComponent } from './modals/log-view-modal/log-view-modal.component';
import { ToastsContainer } from './toasts-container/toasts-container.component';
import { CreateuserModalComponent } from './modals/createuser-modal/createuser-modal.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MarkdownModule } from 'ngx-markdown';
import { WikiComponent } from './wiki/wiki.component';
import { CodeEditorModule } from '@ngstack/code-editor';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { PkgBuildModalComponent } from './modals/pkg-build-modal/pkg-build-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PackagesComponent,
    PackagebuildsComponent,
    DownloadsComponent,
    HomeComponent,
    BuildJobsComponent,
    LoginModalComponent,
    CreateuserModalComponent,
    EditorControlsComponent,
    ControlsComponent,
    JobsControlsComponent,
    LogViewModalComponent,
    NotFoundComponent,
    WikiComponent,
    ConfirmModalComponent,
    PkgBuildModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomeComponent },
      { path: 'wiki', children: [
        { path: '**', component: WikiComponent }
      ]},
      { path: 'packages', component: PackagesComponent },
      { path: 'packagebuilds', component: PackagebuildsComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/jobs', component: BuildJobsComponent },
      { path: 'editor/:pkgbuild', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule) },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' }
    ]),
    NgbModule,
    ToastsContainer,
    CodeEditorModule.forRoot({
      baseUrl: 'assets/monaco',
      typingsWorkerUrl: 'assets/workers/typings-worker.js'
    }),
    MarkdownModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
