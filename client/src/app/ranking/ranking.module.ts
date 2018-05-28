import {RankingComponent} from './ranking.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    RankingComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  exports: [
    RankingComponent
  ]
})
export class RankingModule {

}
