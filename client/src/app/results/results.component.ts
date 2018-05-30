import {Component, OnInit} from '@angular/core';
import {ResultService} from "../shared/services/result.service";
import {AllResultsForUser} from "../shared/model";
import {AuthService} from "../shared/services/auth.service";


@Component({
  selector: 'sc-results',
  styles: [`
    .ui.container {
      height: 100%;
      padding-top: 80px;
    }

    table {
      margin: 0 auto !important;
    }

    tr.selected {
      background-color: #baffa1;
    }
  `],
  template: `
    <div class="ui container">
      <sc-loader *ngIf="isLoading"></sc-loader>
      <sc-error-message *ngIf="!isLoading && isError"></sc-error-message>
      <ng-container *ngIf="!isLoading && !isError && results && results.length > 0">
        <table class="ui green collapsing compact table unstackable">
          <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th class="right aligned">Points</th>
          </tr>
          </thead>
          <tbody>
          <tr
            *ngFor="let userResults of results; trackBy: trackByFullUserName"
            [ngClass]="getRowClass(userResults)"
          >
            <td class="collapsing">
              <b>#{{userResults.place}}</b>
            </td>
            <td>
              {{userResults.fullUserName}}
            </td>
            <td class="right aligned">
              <b>{{userResults.summaryPoints}}/{{userResults.resultsForMatches.length * 3}}</b>
            </td>
          </tr>
          </tbody>
        </table>
      </ng-container>
    </div>
  `
})
export class ResultsComponent implements OnInit {

  public isLoading = true;
  public isError = false;
  public results: AllResultsForUser[];

  constructor(private resultService: ResultService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.resultService.getAllResults()
      .subscribe(
        allResults => {
          this.results = allResults
          this.isError = false;
          this.isLoading = false;
        },
        e => {
          this.isError = true;
          this.isLoading = false;
        });
  }

  public getRowClass(userResults: AllResultsForUser) {
    return userResults.fullUserName === this.authService.getUser().fullName ? 'selected' : '';
  }


  public trackByFullUserName(index: number, fullUserName: string) {
    return fullUserName;
  }
}
