import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ConfigService } from './shared/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public contentHeight = 0;
  public navHeight = 0;
  @ViewChild('navbar', { static: false }) navbar: ElementRef | undefined;

  constructor(private router: Router, public config: ConfigService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.getElementById("navbar-alt-markup")?.classList.add("collapse");
        this.config.nav_open = false;
      }
    });
    this.onResize();
  }

  toggleNav() {
    this.config.nav_open = !this.config.nav_open;

    if (this.config.nav_open){
      document.getElementById("navbar-alt-markup")?.classList.remove("collapse");
    } else {
      document.getElementById("navbar-alt-markup")?.classList.add("collapse");
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.contentHeight = window.innerHeight;
  }
}
