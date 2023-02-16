import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    branchAPIURL: 'https://api.acacialinux.org/',
    isDarkMode: false
  }

  //The currently held authkey from the branch masterserver
  public authKey: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)){
      this.checkForDarkMode();
    }
  }

  checkForDarkMode() {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    this.config.isDarkMode = mql.matches;
    mql.addListener((e) => {
      this.config.isDarkMode = e.matches;
    });
  }

  getBranchAPIURL() {
    return this.config.branchAPIURL;
  }

  isDarkMode(): boolean{
    return this.config.isDarkMode;
  }
}
