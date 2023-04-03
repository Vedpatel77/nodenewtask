import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';
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
  data:any;
  Odata:any;
  constructor(public service:NodeService, private Router : Router){}
ngOnInit(): void {
  this.getusers();
}

updateForm = new FormGroup({
  firstName:new FormControl(''),
  lastName:new FormControl(''),
  email:new FormControl(''),
  number:new FormControl(''), 
})

   isadmin(){
    this.data = sessionStorage.getItem('user');
    this.Odata = JSON.parse(this.data);
    if(this.Odata.role == "admin"){
      return true;
    }else{
      return false;
    }
   }

  getusers(){
    this.service.getuser().subscribe((res)=>{
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
    this.service.updateuser(id,data).subscribe(( res)=>{
    }); 
    let ref=document.getElementById('cancel');
      ref?.click();
      this.getusers();

  }

  deleteUser(id:any){
    this.service.deleteuser(id).subscribe(( res)=>{
      this.getusers();
    });
  }

}
