import {Component, Input} from '@angular/core';
import {MatchWithUserType} from "./model";


@Component({
  selector: 'sc-match-group',
  template: `
    <div class="ui container">
        <h2>{{label}}</h2>
        <sc-match 
            *ngFor="let matchWithType of matchGroup"
            [matchWithType]="matchWithType"
        ></sc-match>
    </div>
`
})
export class MatchGroupComponent {

  @Input() label: string;
  @Input() matchGroup: Array<MatchWithUserType>;
}
