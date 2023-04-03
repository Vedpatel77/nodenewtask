import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
 
  constructor(public http:HttpClient) { }

  isuserlogedin(){
      if (sessionStorage.length == 0) {
        return false;
      } else {
        return true;
      }
  }

  


}
