import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NodeService } from '../service/node.service';

@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {
  constructor(private service:NodeService){}
  canActivate(){
    if (this.service.isuserlogedin() == true) {
      return true;
    } else {
      return false;
    }
  }
  
}
