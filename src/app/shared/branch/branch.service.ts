import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { interval, map, Observable, Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastService } from 'src/app/toasts-container/toast-service';

export class BranchResponse {
  status: string = ""
  response_code: number = 0;
  payload: any
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(public config: ConfigService, private http: HttpClient, private cookies: CookieService, private toasts: ToastService) {
    //Check authkey every 60 sec
    const checkauth_timer = interval(60000);
    checkauth_timer.subscribe(_ => this.auto_checkauth());

    if (this.cookies.check("username")) {
      this.config.username = this.cookies.get("username");
    }

    if (this.cookies.check("authkey")) {
      this.checkauth(this.cookies.get("authkey")).subscribe();
    }
  }

  request(get: string): Observable<any> {
    return this.http.get(this.config.getBranchAPIURL() + "?get=" + get);
  }

  error(action: string, message: string) {
    console.error("Failed to " + action + ": " + message);
  }

  authenticate(username: string, password: string): Observable<string> {
    let req = {
      user: username,
      pass: password
    };

    return this.http.post(this.config.getBranchAPIURL() + "auth", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(arg => this.authPipe(this, arg, username)));
  }

  //The method called recurringly to check authentication
  auto_checkauth() {
    if (this.config.authKey != "") {
      this.checkauth().subscribe();
    }
  }

  checkauth(authkey: string = this.config.authKey): Observable<boolean> {
    let req = {
      authkey: authkey
    };

    return this.http.post(this.config.getBranchAPIURL() + "checkauth", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(arg => this.checkauthPipe(this, authkey, arg)));
  }

  logoff() {
    let req = {
      authkey: this.config.authKey
    };

    return this.http.post(this.config.getBranchAPIURL() + "logoff", req)
      .pipe(map<any, BranchResponse>(data => data))
      .subscribe(val => {
        if (val.response_code == 200) {
          this.config.authKey = "";
          this.config.username = "";

          this.cookies.delete("authkey");
          this.cookies.delete("username");
          console.debug("Logoff ok!");
        } else {
          this.error("logoff", val.payload);
        }
      });
  }

  createuser(username: string, password: string): Observable<string> {
    let req = {
      authkey: this.config.authKey,
      cuser: username,
      cpass: password
    };

    return this.http.post(this.config.getBranchAPIURL() + "createuser", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.createuserPipe(val)));
  }

  submit(pkgbuild: string): Observable<boolean> {
    let req = {
      authkey: this.config.authKey,
      packagebuild: pkgbuild
    };

    return this.http.post(this.config.getBranchAPIURL() + "submitpackagebuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("submit packagebuild", val)));
  }

  releasebuild(pkgname: string): Observable<boolean> {
    let req = {
      authkey: this.config.authKey,
      pkgname: pkgname
    }

    return this.http.post(this.config.getBranchAPIURL() + "releasebuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("releasebuild " + pkgname, val)));
  }

  crossbuild(pkgname: string): Observable<boolean> {
    let req = {
      authkey: this.config.authKey,
      pkgname: pkgname
    }

    return this.http.post(this.config.getBranchAPIURL() + "crossbuild", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("crossbuild " + pkgname, val)));
  }

  clearcompletedjobs(): Observable<boolean> {
    let req = {
      authkey: this.config.authKey
    }

    return this.http.post(this.config.getBranchAPIURL() + "clearcompletedjobs", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("clear completed jobs", val)));
  }

  cancelqueuedjobs(): Observable<boolean> {
    let req = {
      authkey: this.config.authKey
    }

    return this.http.post(this.config.getBranchAPIURL() + "cancelqueuedjobs", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("cancel queued jobs", val)));
  }

  deletepkg(pkgname: string): Observable<boolean> {
    let req = {
      authkey: this.config.authKey,
      pkgname: pkgname
    }

    return this.http.post(this.config.getBranchAPIURL() + "deletepackage", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.defaultPipe("delete package & packagebuild '" + pkgname + "'", val)));
  }

  getlog(jobID: string): Observable<string[] | undefined> {
    let req = {
      authkey: this.config.authKey,
      jobid: jobID
    }

    return this.http.post(this.config.getBranchAPIURL() + "viewlog", req)
      .pipe(map<any, BranchResponse>(data => data))
      .pipe(map(val => this.logPipe(val)));
  }

  //A pipe function handling the response of an authentication call
  authPipe(self: BranchService, res: BranchResponse, username: string): string {
    let is_ok = res.response_code == 200;
    if (is_ok) {
      self.config.authKey = res.payload;
      self.config.username = username;
      this.cookies.set("username", self.config.username);
      this.cookies.set("authkey", self.config.authKey);
      console.debug("Authentication ok, authkey: '" + self.config.authKey + "'");
      return "";
    } else {
      self.config.authKey = "";
      self.config.username = "";
      this.error("authenticate", res.payload);
      return res.payload;
    }
  }

  createuserPipe(res: BranchResponse): string {
    if (res.response_code == 200) {
      return "";
    } else {
      return res.payload;
    }
  }

  //A pipe function to check if the authkey is still valid
  checkauthPipe(self: BranchService, key: string, res: BranchResponse): boolean {
    let is_ok = res.response_code == 200;
    if (is_ok) {
      console.debug("Authkey '" + key + "' is still valid");
      self.config.authKey = key;
    } else {
      console.error("Authkey '" + key + "' is invalid");
      self.config.authKey = "";
      self.config.username = "";

      if (this.cookies.check("authkey")) {
        this.cookies.delete("authkey");
      }

      if (this.cookies.check("username")) {
        this.cookies.delete("username");
      }
    }
    return is_ok;
  }

  //A pipe function to check if the log was retrieved correctly
  logPipe(res: BranchResponse): string[] | undefined {
    let is_ok = res.response_code == 200;
    if (is_ok) {
      return res.payload;
    } else {
      this.error("retrieve log", res.payload)
      return undefined;
    }
  }

  //A pipe function to check if the authkey is still valid
  defaultPipe(action: string, res: BranchResponse): boolean {
    let is_ok = res.response_code == 200;
    if (is_ok) {
      console.debug("Action " + action + " ok!");
      this.toasts.s_ok("Action " + action + " ok!");
    } else {
      this.error(action, res.payload)
      this.toasts.s_err("Failed to " + action + ": " + res.payload);
    }
    return is_ok;
  }
}
