import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config = {
    branchAPIURL: 'https://api.acacialinux.org/'
  }

  constructor() { }

  getBranchAPIURL() {
    return this.config.branchAPIURL;
  }
}
