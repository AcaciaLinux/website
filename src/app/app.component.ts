import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.getElementById("navbar-alt-markup")?.classList.add("collapse");
      }
    });
  }

  toggleNav() {
    document.getElementById("navbar-alt-markup")?.classList.toggle("collapse");
  }

}
