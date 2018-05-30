import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from "./page-not-found.component";
import {ResultsComponent} from "./results/results.component";
import {HomeComponent} from "./home/home.component";
import {HeaderComponent} from "./header.component";
import {HomeModule} from "./home/home.module";
import {ResultsModule} from "./results/results.module";
import {UserService} from "./shared/services/user.service";
import {MatchService} from "./shared/services/match.service";
import {AuthService} from "./shared/services/auth.service";
import {DateService} from "./shared/services/date.service";
import {StreamService} from "./shared/services/stream.service";
import {TypeService} from "./shared/services/type.service";
import {ResultService} from "./shared/services/result.service";
import {SharedModule} from "./shared/shared.module";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'results', component: ResultsComponent},
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
    ResultsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    SharedModule
  ],
  providers: [
    AuthService,
    DateService,
    MatchService,
    ResultService,
    StreamService,
    TypeService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
