import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../shared/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public config: ConfigService, private router: Router) {

  }

  getStarted() {
    document.location = "https://wiki.acacialinux.org/getting_started";
  }
}
