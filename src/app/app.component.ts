import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navbarHeight = 0;
  title = 'website';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.navbarHeight = this.el.nativeElement.querySelector('#navbar').offsetHeight;
  }

  calcHeight() {
    return window.innerHeight - this.navbarHeight;
  }
}
