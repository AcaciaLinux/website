import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/config/config.service';
import { SearchService } from 'src/app/shared/search/search.service';

@Component({
  selector: 'app-search-controls',
  templateUrl: './search-controls.component.html',
  styleUrls: ['./search-controls.component.css']
})
export class SearchControlsComponent {
  public term: string = "";
  @ViewChild('input', { static: false }) input: ElementRef | undefined;

  constructor(private router: Router, private searchService: SearchService, public config: ConfigService) {

  }

  shouldShow() {
    return this.router.url.includes("packages") || this.router.url.includes("packagebuilds");
  }

  icon_pressed() {
    this.config.search_open = !this.config.search_open;

    if (this.config.search_open) {
      this.searchService.push(this.term);
      setTimeout(() => { // this will make the execution after the above boolean has changed
        if (this.input)
          this.input.nativeElement.focus();
      }, 0);
    } else {
      this.searchService.push("");
    }
  }

  update(event: any) {
    this.searchService.push(this.term);
  }
}
