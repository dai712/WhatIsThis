import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {LoginComponent} from './Login/Login';
import {MenuComponent} from './Menu/Menu';
import {FormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";

import {HttpClientModule} from '@angular/common/http';
import {HttpService} from './HttpService';

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
      {path: 'private/:ID', component: PrivateComponent},
      {path: 'group/:ID', component: GroupComponent},
      {path: 'privaterepository/:ID', component: PrivateRepositoryComponent},
      {path: 'privateschedule/:ID', component: PrivateScheduleComponent},
      {path: 'profile/:ID', component: ProfileComponent},
      {path: 'grouprepository/:ID', component: GroupRepositoryComponent},
      {path: 'search/:ID', component: SearchComponent},
      {path: 'collaboration/:ID', component: CollaborationComponent},
      {path: 'grouptodo/:ID', component: GroupToDoComponent},
      {path: 'memberschedule/:ID', component: MemberScheduleComponent},
    ])
  ],
  providers: [
    HttpService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
