import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  ruser:any={};
  constructor(public service : NodeService,private route:Router){}

  ngOnInit(): void {
    
  }

  registerForm = new FormGroup({
      firstName:new FormControl('',[Validators.required]),
      lastName:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required]),
      role:new FormControl('',[Validators.required]),
      number:new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required])
  })

  get firstName(){
    return this.registerForm.get('firstName')
  }
  get lastName(){
    return this.registerForm.get('lastName')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get role(){
    return this.registerForm.get('role')
  }
  get number(){
    return this.registerForm.get('number')
  }
  get password(){
    return this.registerForm.get('password')
  }

  userRegister(Data : any){
    this.service.register(Data);
   }  
}
