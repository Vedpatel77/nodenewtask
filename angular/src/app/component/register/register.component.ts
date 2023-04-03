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
  constructor(private http : HttpClient,private route:Router){}

  registerForm = new FormGroup({
      firstName:new FormControl(''),
      lastName:new FormControl(''),
      email:new FormControl(''),
      number:new FormControl(''),
      password:new FormControl(''),
  })
  userRegister(Data : any){
    this.http.post('http://localhost:3000/users',Data)
    .subscribe((res)=>{
      this.ruser=res;
      console.log(this.ruser);
      
      if (this.ruser !== undefined) {
        console.log(this.registerForm.value);
        
        alert("register successful!");
        // console.log(this.ruser);
        
        
        sessionStorage.setItem('user',JSON.stringify(this.ruser));
        this.route.navigate(['/home']);
      } else {
        alert("you are not register!");
        this.route.navigate(['/home']);
      }
    });
   }  
}
