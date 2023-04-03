import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  Data : any;
  id : any;
  islogedin: any; 
  // user: any;
  constructor(private Router : Router,private http:HttpClient,private service:NodeService){}

  viewUser(){
    this.Data = sessionStorage.getItem('user');
    this.id = JSON.parse(this.Data);
    console.log(this.id);
    
    this.Router.navigate(['/users/' + this.id._id]);  
  }
  logout(){
    this.Data = sessionStorage.getItem('user');
    this.id = JSON.parse(this.Data)
    this.http.get('http://localhost:3000/logout',{
      withCredentials : true
    }).subscribe((res)=>{
      console.log(res);
    });
    sessionStorage.clear();
    this.Router.navigate(['/login']);
  }

  islog(){
    if (this.service.isuserlogedin()) {
      return true;
    } else {
      return false;
    }
  }

}
