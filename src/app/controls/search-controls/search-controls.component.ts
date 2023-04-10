import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/shared/search/search.service';

@Component({
  selector: 'app-search-controls',
  templateUrl: './search-controls.component.html',
  styleUrls: ['./search-controls.component.css']
})
export class SearchControlsComponent {

  public active: boolean = false;
  public term: string = "";

  constructor(private router: Router, private searchService: SearchService){

  }

  toggle(){
    this.active = !this.active;
  }

  shouldShow(){
    return this.router.url.includes("packages") || this.router.url.includes("packagebuilds");
  }

  update(event: any){
    this.searchService.push(this.term);
  }
}
