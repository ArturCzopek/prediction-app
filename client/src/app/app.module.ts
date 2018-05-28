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
import {UserService} from "./shared/user.service";
import {MatchService} from "./shared/match.service";
import {LoaderComponent} from "./shared/loader.component";
import {AuthService} from "./shared/auth.service";

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
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    HttpClientModule,
    RankingModule,
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  providers: [
    AuthService,
    MatchService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
