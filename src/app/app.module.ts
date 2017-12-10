import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './Login/Login';
import {MenuComponent} from './Menu/Menu';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './HttpService';
import {WindowRef} from "./window";


import {CollaborationComponent} from './Main/Group/Collaboration/Collaboration';
import {GroupRepositoryComponent} from './Main/Group/GroupRepository/GroupRepository';
import {GroupToDoComponent} from './Main/Group/GroupToDo/GroupToDo';
import {MemberScheduleComponent} from './Main/Group/MemberSchedule/MemberSchedule';
import {GroupComponent} from './Main/Group/Group';
import {PrivateRepositoryComponent} from './Main/Private/PrivateRepository/PrivateRepository';
import {PrivateScheduleComponent} from './Main/Private/PrivateSchedule/PrivateSchedule';
import {ProfileComponent} from './Main/Private/Profile/Profile';
import {PrivateComponent} from './Main/Private/Private';
import {SearchComponent} from './Main/Search/Search';
import {GroupRoutingComponent} from "./Main/Group/GroupRouting/GroupRouting";
import {DocsComponent} from "./Main/Group/Collaboration/Docs/Docs";

import {FileUploadModule} from '../../node_modules/ng2-file-upload/ng2-file-upload.js';
import "froala-editor/js/froala_editor.pkgd.min.js";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { SheetModule } from 'angular5-spreadsheet';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    CollaborationComponent,
    GroupRepositoryComponent,
    GroupToDoComponent,
    MemberScheduleComponent,
    GroupComponent,
    PrivateRepositoryComponent,
    PrivateScheduleComponent,
    PrivateComponent,
    ProfileComponent,
    SearchComponent,
    GroupRoutingComponent,
    DocsComponent,
  ],
  imports: [
    FileUploadModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/', pathMatch: 'full'},
    ]),
    RouterModule.forChild([
      {path: 'docs/:ID/:GID', component: DocsComponent},
      {path: 'private/:ID', component: PrivateComponent},
      {path: 'group/:ID', component: GroupComponent},
      {path: 'privaterepository/:ID', component: PrivateRepositoryComponent},
      {path: 'privateschedule/:ID', component: PrivateScheduleComponent},
      {path: 'profile/:ID', component: ProfileComponent},
      {path: 'grouprepository/:ID/:GID', component: GroupRepositoryComponent},
      {path: 'search/:ID', component: SearchComponent},
      {path: 'collaboration/:ID/:GID', component: CollaborationComponent},
      {path: 'grouptodo/:ID/:GID', component: GroupToDoComponent},
      {path: 'memberschedule/:ID/:GID', component: MemberScheduleComponent},
      {path: 'grouprouting/:ID/:GID', component: GroupRoutingComponent},
    ]),
    FroalaViewModule.forRoot(),
    FroalaEditorModule.forRoot(),
  SheetModule,
  ],
  providers: [
    HttpService,
    WindowRef,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
