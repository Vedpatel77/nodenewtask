import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { AgGridAngular } from 'ag-grid-angular';
// import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  edituserdata:any;
  constructor(private http:HttpClient , private Router : Router){}
ngOnInit(): void {
  this.getusers();
}

updateForm = new FormGroup({
  firstName:new FormControl(''),
  lastName:new FormControl(''),
  email:new FormControl(''),
  number:new FormControl(''), 
})

  getusers(){
    this.http.get('http://localhost:3000/tabledata').subscribe((res)=>{
      console.log(res);
      
      this.users=res;
    });
  }

  edituser(user:any){

    this.edituserdata=user._id;
    this.updateForm.controls['firstName'].setValue(user.firstName);
    this.updateForm.controls['lastName'].setValue(user.lastName);
    this.updateForm.controls['email'].setValue(user.email);
    this.updateForm.controls['number'].setValue(user.number);
  }
  
  updateUser(id:any,data:any){
    this.http.patch(`http://localhost:3000/users/${id}`,data).subscribe(( res)=>{
    }); 
    let ref=document.getElementById('cancel');
      ref?.click();
      this.getusers();

  }

  deleteUser(id:any){
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe(( res)=>{
      console.log(res);
      this.getusers();
    });
  }

}
