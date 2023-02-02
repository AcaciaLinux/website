import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public contentHeight = 0;
  public navHeight = 0;
  @ViewChild('navbar', { static: false }) navbar: ElementRef | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        document.getElementById("navbar-alt-markup")?.classList.add("collapse");
      }
    });
  }

  ngAfterViewInit() {
    this.navHeight = this.navbar?.nativeElement.offsetHeight;
    this.contentHeight = window.innerHeight;
  }

  toggleNav() {
    document.getElementById("navbar-alt-markup")?.classList.toggle("collapse");
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log(this.contentHeight)
    this.contentHeight = window.innerHeight;
  }
}
