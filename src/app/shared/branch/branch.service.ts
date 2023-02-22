import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map, Observable } from 'rxjs';

class BranchResponse{
  status: string = ""
  response_code: number = 0;
  payload: any
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(public config: ConfigService, private http: HttpClient) {

  }

  request(get: string): Observable<any> {
    return this.http.get(this.config.getBranchAPIURL() + "?get=" + get);
  }

  authenticate(username: string, password: string): Observable<boolean>{
    let req = {
      user: username,
      pass: password
    };

    return this.http.post(this.config.getBranchAPIURL() + "auth", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(arg => this.authPipe(this, arg)));
  }

  submit(pkgbuild: string){
    let req = {
      authkey: this.config.authKey,
      packagebuild: pkgbuild
    };

    return this.http.post(this.config.getBranchAPIURL() + "submitpackagebuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .subscribe(res => {
        if (res.response_code != 200){
          console.error("Failed to submit: " + res.payload);
        }
      });
  }

  //A pipe function handling the response of an authentication call
  authPipe(self: BranchService, resp: BranchResponse): boolean{
    let is_ok = resp.response_code == 200;
    if (is_ok){
      self.config.authKey = resp.payload;
      console.debug("Authentication ok, authkey: '" + self.config.authKey + "'");
    } else {
      console.error("Failed to authenticate with code " + resp.response_code + ": " + resp.payload);
    }
    return is_ok;
  }
}
