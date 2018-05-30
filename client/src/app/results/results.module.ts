import {ResultsComponent} from './results.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    ResultsComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    ResultsComponent
  ]
})
export class ResultsModule {

}
