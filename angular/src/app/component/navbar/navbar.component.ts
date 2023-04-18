import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  Data : any;
  id : any;
  islogedin: any; 
  data: any;
  constructor(private Router : Router,public service:NodeService){

    
  }

  ngOnInit(): void {
    this.Data = sessionStorage.getItem('user');
    this.id = JSON.parse(this.Data);
    console.log(this.id);
  }

  viewUser(){
    this.Router.navigate(['/users/' + this.id._id]);  
  }
  logout(){
    this.service.logout()
  }

  islog(){
    if (this.service.isuserlogedin()) {
      return true;
    } else {
      return false;
    }
  }

}
