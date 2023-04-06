import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NodeService } from '../service/node.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CanactivateGuard implements CanActivate {
  constructor(private service:NodeService,private snakebar:MatSnackBar){}
  canActivate(){
    if (this.service.isuserlogedin() == true) {
      return true;
    } else {
      this.snakebar.open("you are not eligible to do this!", '', {
        duration: 3000,
        verticalPosition: 'top'
      })
      return false;
    }
  }
  
}
