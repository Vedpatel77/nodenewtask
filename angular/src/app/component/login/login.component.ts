import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public service:NodeService,private route :Router){}

  ngOnInit(): void {
    
  }


  data:any=[];
  loginform = new FormGroup({
  email:new FormControl('',[Validators.required]),
  password:new FormControl('',[Validators.required])
})

get email(){
  return this.loginform.get('email');
}
get password(){
  return this.loginform.get('password');
}

   postlogindata(Data:any){
    this.service.login(Data);
   }
}
