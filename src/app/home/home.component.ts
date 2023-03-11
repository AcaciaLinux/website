import { Component } from '@angular/core';
import { ConfigService } from '../shared/config/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public config: ConfigService){

  }

  goToGitHub(){
    window.location.href = "https://github.com/AcaciaLinux";
  }
}
