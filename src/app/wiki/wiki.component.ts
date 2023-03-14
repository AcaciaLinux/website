import { Component, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { MarkdownComponent, MarkdownService } from 'ngx-markdown';
import { Subscription } from 'rxjs';
import { ConfigService } from '../shared/config/config.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent {
  private routerevents: Subscription;
  private listenObj: any;
  public article = "";

  @ViewChild('outlet', {static: false}) private outlet?: MarkdownComponent;

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private router: Router, private config: ConfigService){
    this.routerevents = router.events.subscribe(e => {
      if (e instanceof NavigationEnd){
        let url = this.route.snapshot.url;

        this.article = this.getMDURL(url.map(m => m.toString()));
      }
    });
  }

  public onMarkdownLoad() {
    if (this.outlet) {
      this.listenObj = this.renderer.listen(this.outlet.element.nativeElement, 'click', (e: Event) => {
        if (e.target && (e.target as any).tagName === 'A') {
          const el = (e.target as HTMLElement);
          const linkURL = el.getAttribute && el.getAttribute('href');

          if (linkURL){
            if (linkURL.startsWith('/')){
              this.router.navigate(("wiki" + linkURL.replaceAll(".md", "")).split('/'));
              e.preventDefault();
            }
          }

        }
      });
    }
  }

  getMDURL(url: string[]): string{
    // If the url is nothing, return the Home page
    if (url.length == 0){
      return this.config.getWikiURL() + "Home.md";
    }

    return this.config.getWikiURL() + url.toString().replaceAll(',', '/') + ".md";
  }

  ngOnInit(): void{
    let url = this.route.snapshot.url;

    this.article = this.getMDURL(url.map(m => m.toString()));
  }

  ngOnDestroy(): void {
    if (this.listenObj) {
      this.listenObj();
    }

    this.routerevents.unsubscribe();
  }

}
