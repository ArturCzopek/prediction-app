import {Component, OnInit} from '@angular/core';
import {MatchWithUserType} from "./model";
import {MatchService} from "../shared/match.service";
import {AuthService} from "../shared/auth.service";


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
    </div>
  `
})
export class HomeComponent implements OnInit {

  public objectKeys = Object.keys;
  public matchesWithUserType: Map<String, Array<MatchWithUserType>> = null;

  constructor(private matchService: MatchService, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.matchService.getAllMatchesWithUserTypes()
      .subscribe(
        matches => {
          this.matchesWithUserType = matches
        }
      );
  }
}
