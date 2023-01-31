import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private config: ConfigService) { }

}
