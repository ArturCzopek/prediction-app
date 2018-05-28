import {Component, OnInit} from '@angular/core';
import {MatchWithUserType} from "./model";
import {MatchService} from "../shared/match.service";


@Component({
  selector: 'sc-home',
  styles: [`
    .ui.container {
      height: 100%;
      padding-top: 40px;
    }
  `],
  template: `
    <div class="ui container">
        <sc-loader *ngIf="!matchesWithUserType; else groups"></sc-loader>
        <ng-template #groups>
            <sc-hello></sc-hello>
            <sc-add-match></sc-add-match>
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

  constructor(private matchService: MatchService) {}

  ngOnInit(): void {
    this.matchService.getAllMatchesWithUserTypes()
      .subscribe(
        matches => {
          console.log('matches', matches)
          this.matchesWithUserType = matches
        }
      );
  }
}
