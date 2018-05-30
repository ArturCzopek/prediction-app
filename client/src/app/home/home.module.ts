import {HomeComponent} from './home.component';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchGroupComponent} from "./match-group.component";
import {SharedModule} from "../shared/shared.module";
import {MatchCardComponent} from "./match-card.component";
import {AddMatchComponent} from "./add-match.component";
import {HelloComponent} from "./hello.component";

@NgModule({
  declarations: [
    AddMatchComponent,
    HelloComponent,
    HomeComponent,
    MatchGroupComponent,
    MatchCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {

}
