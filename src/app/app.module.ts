import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    PackagesComponent,
    PackagebuildsComponent,
    DownloadsComponent,
    HomeComponent,
    BuildJobsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: 'packages', component: PackagesComponent },
      { path: 'packagebuilds', component: PackagebuildsComponent },
      { path: 'downloads', component: DownloadsComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'admin/jobs', component: BuildJobsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full'}
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
