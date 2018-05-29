import {Component, Input} from '@angular/core';
import {MatchWithUserType} from "../shared/model";


@Component({
  selector: 'sc-match-group',
  styles: [`
    .ui.grid {
      margin-top: 30px;
    }
  `],
  template: `
    <div class="ui grid">
      <div class="sixteen wide column"><h2>{{label}}</h2></div>
      <div *ngFor="let matchWithType of matchGroup" class="eight wide column">
        <sc-match-card
          [matchWithType]="matchWithType"
        ></sc-match-card>
      </div>
    </div>
  `
})
export class MatchGroupComponent {

  @Input() label: string;
  @Input() matchGroup: Array<MatchWithUserType>;
}
