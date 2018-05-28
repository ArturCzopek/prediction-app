import {Component, Input} from '@angular/core';
import {MatchWithUserType} from "./model";


@Component({
  selector: 'sc-match',
  template: `
    <div class="ui container">
        <p>Points for type: {{matchWithType?.type?.pointsForType || "-"}}</p>
        <p>Date: {{matchWithType.match.time}}</p>
        <p>{{matchWithType.match.team1}} vs {{matchWithType.match.team2}}<br/>
        {{matchWithType.match?.goal1 || "-"}} : {{matchWithType.match?.goal2 || "-"}}</p>
    </div>
`
})
export class MatchComponent {

  @Input() matchWithType: MatchWithUserType;
}
