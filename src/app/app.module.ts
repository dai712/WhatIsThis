import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './Login/Login';
import {MenuComponent} from './Menu/Menu';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";

import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './HttpService';

import {CollaborationComponent} from "./Main/Group/Collaboration/Collaboration";
import {GroupRepositoryComponent} from "./Main/Group/GroupRepository/GroupRepository";
import {GroupToDoComponent} from "./Main/Group/GroupToDo/GroupToDo";
import {MemberScheduleComponent} from "./Main/Group/MemberSchedule/MemberSchedule";
import {GroupComponent} from "./Main/Group/Group";
import {PrivateRepositoryComponent} from "./Main/Private/PrivateRepository/PrivateRepository";
import {PrivateScheduleComponent} from "./Main/Private/PrivateSchedule/PrivateSchedule";
import {ProfileComponent} from "./Main/Private/Profile/Profile";
import {PrivateComponent} from "./Main/Private/Private";
import {SearchComponent} from "./Main/Search/Search";

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
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/', pathMatch: 'full'},
    ]),
    RouterModule.forChild([
      {path: 'private', component: PrivateComponent},
      {path: 'group', component: GroupComponent},
      {path: 'search', component: SearchComponent},
      {path: 'privaterepository', component: PrivateRepositoryComponent},
      {path: 'privateschedule', component: PrivateScheduleComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'grouprepository', component: GroupRepositoryComponent},
      {path: 'search', component: SearchComponent},
      {path: 'collaboration', component: CollaborationComponent},
      {path: 'grouptodo', component: GroupToDoComponent},
      {path: 'memberschedule', component: MemberScheduleComponent},
    ])
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
