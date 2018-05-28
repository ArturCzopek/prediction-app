import {HomeComponent} from './home.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {

}
