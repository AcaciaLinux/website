import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

export const PAGE_TITLE = "AcaciaLinux staging";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    branchAPIURL: "https://api.acacialinux.org/",
    artifactsURL: "https://artifacts.acacialinux.org/artifacts.json",
    wikiURL: "https://artifacts.acacialinux.org/wiki",
    templatesURL: "https://artifacts.acacialinux.org/templates.json",
    isDarkMode: false
  }

  //The currently held authkey from the branch masterserver
  public authKey: string = "";
  public username: string = "";
  public search_open: boolean = false;
  public nav_open: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
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

  getArtifactsURL() {
    return this.config.artifactsURL;
  }

  getTemplatesURL() {
    return this.config.templatesURL;
  }

  getWikiURL() {
    if (this.config.wikiURL.endsWith('/'))
      return this.config.wikiURL;
    else
      return this.config.wikiURL + "/";
  }

  isDarkMode(): boolean {
    return this.config.isDarkMode;
  }
}
