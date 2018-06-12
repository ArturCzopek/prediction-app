import {Component, Input} from '@angular/core';
import {MatchWithUserType} from "../shared/model";
import {DateService} from "../shared/services/date.service";


@Component({
  selector: 'sc-match-group',
  styles: [`
    .ui.grid {
      margin-top: 30px;
    }
  `],
  template: `
    <div class="ui grid" *ngIf="isValidDateToShow()">
      <div class="sixteen wide column"><h2>{{label}}</h2></div>
      <div *ngFor="let matchWithType of matchGroup" class="sixteen wide mobile eight wide computer column">
        <sc-match-card
          [matchWithType]="matchWithType"
          [showOnlyTodayMatches]="showOnlyTodayMatches"
        ></sc-match-card>
      </div>
    </div>
  `
})
export class MatchGroupComponent {

  constructor(private dateService: DateService) {}

  @Input() label: string;
  @Input() matchGroup: MatchWithUserType[];
  @Input() showOnlyTodayMatches: boolean;

  public isValidDateToShow() {
    return !this.showOnlyTodayMatches || (this.showOnlyTodayMatches && this.matchGroup.some(matchWithType => this.dateService.isDateToday(matchWithType.match.time)))
  }
}
