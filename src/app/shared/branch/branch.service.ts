import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { map, Observable } from 'rxjs';

class BranchResponse{
  status: string = ""
  payload: any
}

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private config: ConfigService, private http: HttpClient) {

  }

  request(get: string): Observable<any> {
    return this.http.get(this.config.getBranchAPIURL() + "?get=" + get);
  }

  authenticate(username: string, password: string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    let req = "user=" + username + "&pass=" + password;

    this.http.post(this.config.getBranchAPIURL() + "auth", req, httpOptions)
      .pipe(map<any, BranchResponse>(data => data))
      .subscribe(bresponse => {
      if (bresponse.status != "SUCCESS"){
        console.log("Authentication failed: " + bresponse.payload);
        this.config.authKey = "";
      } else {
        console.log("Authentication ok!");
        this.config.authKey = bresponse.payload;
      }
    });
  }
}
