import {AdminPanelComponent} from './admin-panel.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {UsersManagementComponent} from "./users-management.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {path: 'admin/users', component: UsersManagementComponent}
];

@NgModule({
  declarations: [
    AdminPanelComponent,
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [
    AdminPanelComponent
  ]
})
export class AdminPanelModule {

}
