import {Component} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";


@Component({
  selector: 'sc-hello',
  styles: [`
    .ui.container {
      margin-bottom: 20px;
      margin-top: 40px;
    }

    h1 {
      font-size: 40px;
    }
  `],
  template: `
    <div class="ui container">
      <h1>Hello, {{authService.getUser()?.firstName || ''}}! Let's have some fun!</h1>
    </div>
  `
})
export class HelloComponent {

  constructor(public authService: AuthService) {
  }
}
