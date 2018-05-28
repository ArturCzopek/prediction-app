import {RankingComponent} from './ranking.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    RankingComponent
  ]
})
export class RankingModule {

}
