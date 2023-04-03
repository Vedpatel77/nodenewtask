import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  ruser:any={};
  constructor(public service : NodeService,private route:Router){}

  registerForm = new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      number:new FormControl(''),
      password:new FormControl(''),
  })
  userRegister(Data : any){
    this.service.register(Data);
   }  
}
