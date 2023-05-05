import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';
import { data } from './data.model';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit{

  blogdata!: FormGroup;
  user:any;
  userid:any;
  file:any;
  dataObj: data = new data();
// blogd:any;
imageFile:any;
imageData!: string;
  constructor(public service:NodeService, private router:Router ,private snakebar:MatSnackBar,private fb:FormBuilder){
   
  }

  ngOnInit(): void {
    this.blogdata = this.fb.group({
      blogerEmail: [''],
      blogTitle: [''],
      blogsummary: [''],
      blogDescription: [''],
      imageFile:['']
    });
    this.user = sessionStorage.getItem('user');
    this.userid = JSON.parse(this.user)._id;
    console.log(this.userid);
    
  }

  // blogdata = new FormGroup({
  //   blogerEmail : new FormControl(''),
  //   blogTitle : new FormControl(''),
  //   blogsummary : new FormControl(''),
  //   blogDescription : new FormControl('')
  // })


  bolgdetail(){
    this.dataObj.blogerEmail=this.blogdata.value.blogerEmail;
      this.dataObj.blogTitle=this.blogdata.value.blogTitle;
      this.dataObj.blogsummary=this.blogdata.value.blogsummary;
      this.dataObj.blogDescription=this.blogdata.value.blogDescription;
      this.dataObj.userid=this.userid;
    // let data={imageFile:this.imageFileblogdata
      this.service.addblog(this.dataObj, this.file).subscribe((res:any)=>{
        // this.blogd=res;
        if (res.statusCode == 200) {
          this.snakebar.open("Blog Added Sucessfully!",'',{
            duration:3000,
            verticalPosition:'top'
          })
          this.router.navigate(['/blogslist']);
        } else {
          this.snakebar.open("something went wrong!",'retry',{
            duration:3000,
            verticalPosition:'top'
          })
        }
      });
  }
 
  onFileSelected(event:any){
    this.file = event.target.files[0];
   
  }

}
