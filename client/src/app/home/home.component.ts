import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchService} from "../shared/services/match.service";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {StreamService} from "../shared/services/stream.service";
import {MatchWithUserType} from "../shared/model";


@Component({
  selector: 'sc-home',
  styles: [`
    .ui.container {
      height: 100%;
      padding-top: 40px;
    }
  `],
  template: `
    <div class="ui container" *ngIf="authService.isLoggedIn()">
      <sc-hello></sc-hello>
      <sc-add-match *ngIf="authService.isLoggedInAsAdmin()"></sc-add-match>
      <sc-loader *ngIf="isLoading"></sc-loader>
      <sc-error-message *ngIf="!isLoading && isError"></sc-error-message>
      <ng-container *ngIf="!isLoading && !isError && matchesWithUserType">
        <sc-match-group *ngFor="let label of objectKeys(matchesWithUserType); trackBy: trackByLabel"
                        [label]="label"
                        [matchGroup]="matchesWithUserType[label]"
        ></sc-match-group>
      </ng-container>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {

  public objectKeys = Object.keys;
  public isLoading = true;
  public isError = false;
  public matchesWithUserType: Map<String, Array<MatchWithUserType>> = null;
  private refreshPage$: Subscription;

  constructor(
    public authService: AuthService,
    private matchService: MatchService,
    private streamService: StreamService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.refreshPage$ = this.streamService.refreshHomePage.subscribe(refresh => this.loadMatches())
    this.loadMatches();
  }

  ngOnDestroy(): void {
    if (this.refreshPage$) {
      this.refreshPage$.unsubscribe();
    }
  }

  private loadMatches() {
    this.matchService.getAllMatchesWithUserTypes()
      .subscribe(
        matches => {
          this.matchesWithUserType = matches
          this.isError = false;
          this.isLoading = false;
        },
        e => {
          this.isError = true;
          this.isLoading = false;
        });
  }

  public trackByLabel(index: number, label: string) {
    return label;
  }
}
