import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'sc-header',
  styles: [`
    a.item.title {
      padding: 10px 0; 
      font-size: 20px; 
    } 
    a.item.title:before {
      width:0 !important;
    }
    a.item.title:hover {
      background: #2185D0 !important;
    }
    `
  ],
  template: `
    <div class="ui inverted blue fixed menu">
        <div class="ui container">
            <div class="menu">
                <a class="item title"[routerLink]="['/']" >PREDICTION APP</a>
            </div>
            <div class="right menu">
                <a class="item" [routerLink]="['/home']" routerLinkActive="active">Home</a>
                <a class="item" [routerLink]="['/ranking']" routerLinkActive="active">Ranking</a>
            </div>
        </div>
    </div>
`
})
export class HeaderComponent {

}
