import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatchService} from "../shared/match.service";
import {AuthService} from "../shared/auth.service";
import {Subscription} from "rxjs/internal/Subscription";
import {StreamService} from "../shared/stream.service";
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
      <sc-loader *ngIf="!matchesWithUserType; else groups"></sc-loader>
      <ng-template #groups>
        <sc-match-group *ngFor="let label of objectKeys(matchesWithUserType)"
                        [label]="label"
                        [matchGroup]="matchesWithUserType[label]"
        ></sc-match-group>
      </ng-template>
      <sc-modal-add-match></sc-modal-add-match>
      <sc-modal-add-result></sc-modal-add-result>
      <sc-modal-add-type></sc-modal-add-type>
    </div>
  `
})
export class HomeComponent implements OnInit, OnDestroy {

  public objectKeys = Object.keys;
  public matchesWithUserType: Map<String, Array<MatchWithUserType>> = null;
  private refreshPage$: Subscription;

  constructor(
    public authService: AuthService,
    private matchService: MatchService,
    private streamService: StreamService
  ) {}

  ngOnInit(): void {
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
        }
      );
  }
}
