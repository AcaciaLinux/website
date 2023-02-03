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

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PackagesComponent,
    PackagebuildsComponent,
    DownloadsComponent,
    HomeComponent,
    BuildJobsComponent,
    EditorComponent
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
    CodeEditorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
