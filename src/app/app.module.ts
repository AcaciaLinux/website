import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { PkgBuildModalComponent } from './modals/pkg-build-modal/pkg-build-modal.component';
import { SearchControlsComponent } from './controls/search-controls/search-controls.component';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapSearch, bootstrapPerson, bootstrapBoxArrowRight, bootstrapChevronRight, bootstrapTools, bootstrapHammer, bootstrapTrash, bootstrapPlusSquare, bootstrapBoxArrowUpRight } from '@ng-icons/bootstrap-icons';
import { FormsModule } from '@angular/forms';
import { UserMgrComponent } from './admin/user-mgr/user-mgr.component';
import { ConfigService, PAGE_TITLE } from './shared/config/config.service';

@NgModule({
  declarations: [
    AppComponent,
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
    ConfirmModalComponent,
    PkgBuildModalComponent,
    SearchControlsComponent,
    UserMgrComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    NgIconsModule.withIcons({ bootstrapSearch, bootstrapPerson, bootstrapBoxArrowRight, bootstrapChevronRight, bootstrapTools, bootstrapHammer, bootstrapTrash, bootstrapPlusSquare, bootstrapBoxArrowUpRight }),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: PAGE_TITLE },
      { path: 'packages', component: PackagesComponent, title: "Packages - " + PAGE_TITLE },
      { path: 'packagebuilds', component: PackagebuildsComponent, title: "Packagebuilds - " + PAGE_TITLE },
      { path: 'downloads', component: DownloadsComponent, title: "Downloads - " + PAGE_TITLE },
      { path: 'admin/users', component: UserMgrComponent, title: "Admin/Users - " + PAGE_TITLE },
      { path: 'admin/jobs', component: BuildJobsComponent, title: "Jobs - " + PAGE_TITLE },
      { path: 'editor/:pkgbuild', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule) },
      { path: '**', component: NotFoundComponent, pathMatch: 'full' }
    ]),
    NgbModule,
    ToastsContainer,
    MarkdownModule.forRoot()
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
