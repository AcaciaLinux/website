import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { interval, map, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

class BranchResponse{
  status: string = ""
  response_code: number = 0;
  payload: any
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(public config: ConfigService, private http: HttpClient, private cookies: CookieService) {
    //Check authkey every 60 sec
    const checkauth_timer = interval(60000);
    checkauth_timer.subscribe(_ => this.auto_checkauth());

    if (this.cookies.check("authkey")){
      this.checkauth(this.cookies.get("authkey")).subscribe();
    }
  }

  request(get: string): Observable<any> {
    return this.http.get(this.config.getBranchAPIURL() + "?get=" + get);
  }

  error(action: string, message: string){
    console.error("Failed to " + action + ": " + message);
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

  //The method called recurringly to check authentication
  auto_checkauth(){
    if (this.config.authKey != ""){
      this.checkauth().subscribe();
    }
  }

  checkauth(authkey: string = this.config.authKey): Observable<boolean>{
    let req = {
      authkey: authkey
    };

    return this.http.post(this.config.getBranchAPIURL() + "checkauth", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(arg => this.checkauthPipe(this, authkey, arg)));
  }

  logoff(){
    let req = {
      authkey: this.config.authKey
    };

    return this.http.post(this.config.getBranchAPIURL() + "logoff", req)
      .pipe(map<any, BranchResponse>(data => data))
      .subscribe(val => {
        if (val.response_code == 200){
          this.config.authKey = "";
          console.debug("Logoff ok!");
        } else {
          this.error("logoff", val.payload);
        }
      });
  }

  submit(pkgbuild: string): Observable<boolean>{
    let req = {
      authkey: this.config.authKey,
      packagebuild: pkgbuild
    };

    return this.http.post(this.config.getBranchAPIURL() + "submitpackagebuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("submit packagebuild", val)));
  }

  releasebuild(pkgname: string): Observable<boolean>{
    let req = {
      authkey: this.config.authKey,
      pkgname: pkgname
    }

    return this.http.post(this.config.getBranchAPIURL() + "releasebuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("releasebuild " + pkgname, val)));
  }

  crossbuild(pkgname: string): Observable<boolean>{
    let req = {
      authkey: this.config.authKey,
      pkgname: pkgname
    }

    return this.http.post(this.config.getBranchAPIURL() + "crossbuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("releasebuild " + pkgname, val)));
  }

  //A pipe function handling the response of an authentication call
  authPipe(self: BranchService, res: BranchResponse): boolean{
    let is_ok = res.response_code == 200;
    if (is_ok){
      self.config.authKey = res.payload;
      this.cookies.set("authkey", self.config.authKey);
      console.debug("Authentication ok, authkey: '" + self.config.authKey + "'");
    } else {
      this.error("authenticate", res.payload)
    }
    return is_ok;
  }

  //A pipe function to check if the authkey is still valid
  checkauthPipe(self: BranchService, key: string, res: BranchResponse): boolean{
    let is_ok = res.response_code == 200;
    if (is_ok){
      console.debug("Authkey '" + key + "' is still valid");
      self.config.authKey = key;
    } else {
      console.error("Authkey '" + key + "' is invalid");
      self.config.authKey = "";
      if (this.cookies.check("authkey")){
        this.cookies.delete("authkey");
      }
    }
    return is_ok;
  }

  //A pipe function to check if the authkey is still valid
  defaultPipe(action: string, res: BranchResponse): boolean{
    let is_ok = res.response_code == 200;
    if (is_ok){
      console.debug("Action " + action + " ok!");
    } else {
      this.error(action, res.payload)
    }
    return is_ok;
  }
}
