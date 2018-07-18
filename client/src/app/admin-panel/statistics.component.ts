import {Component, OnInit} from "@angular/core";
import {StatRecord} from "../shared/model";
import {StatisticsService} from "../shared/services/statistics.service";

@Component({
  selector: 'sc-users-management',
  styles: [`
    .ui.container {
      height: 100%;
      padding-top: 80px;
    }

    table {
      margin: 0 auto !important;
    }
    
    p.stat-record {
      font-size: 20px;
      margin-bottom: 6px;
    }
  `],
  template: `
    <div class="ui container">
      <sc-loader *ngIf="isLoading"></sc-loader>
      <sc-error-message *ngIf="!isLoading && isError"></sc-error-message>
      <ng-container *ngIf="!isLoading && !isError && stats && stats.length > 0">
        <div *ngFor="let record of stats; trackBy: trackByStatKey">
          <p class="stat-record"><b>{{record.key}}</b> : {{record.value}}</p>
        </div>
      </ng-container>
    </div>
  `
})
export class StatisticsComponent implements OnInit {

  public isLoading = true;
  public isError = false;
  public stats: StatRecord[] = [];

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.statisticsService.getAllStats()
      .subscribe(
        stats => {
          this.stats = stats;
          this.isError = false;
          this.isLoading = false;
        },
        e => {
          this.isError = true;
          this.isLoading = false;
        });
  }

  public trackByStatKey(index: number, stat: StatRecord) {
    return stat.key;
  }
}
