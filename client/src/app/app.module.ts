import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./page-not-found.component";
import {RankingComponent} from "./ranking/ranking.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header.component";
import {HomeModule} from "./home/home.module";
import {RankingModule} from "./ranking/ranking.module";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'ranking', component: RankingComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HomeModule,
    RankingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
