import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-myblog',
  templateUrl: './myblog.component.html',
  styleUrls: ['./myblog.component.css']
})
export class MyblogComponent implements OnInit {
useremail:any;
userblog:any;
editblogdataid: any;

constructor(public service:NodeService,private snakebar:MatSnackBar,private route:Router){
  this.useremail=service.loginuser[0].email;
}

updateBlogForm = new FormGroup({
  blogTitle : new FormControl(''),
  blogsummary : new FormControl(''),
  blogDescription : new FormControl(''),
  imageUrl : new FormControl(''),
})

ngOnInit(): void {
  this.getblogs()
}

  getblogs(){
    
    this.service.getuserblog(this.useremail).subscribe((res:any)=>{
      
      this.userblog=res.blogs;
      if (res.statusCode == 400) {
        this.snakebar.open("somthing went wrong!",'retry',{
          duration:3000,
          verticalPosition:'top'
        })
      } 
    
    })
  }


  editblog(blog:any){
    // console.log(blog);
    
    this.editblogdataid=blog._id;
    this.updateBlogForm.controls['blogTitle'].setValue(blog.blogTitle);
    this.updateBlogForm.controls['blogsummary'].setValue(blog.blogsummary);
    this.updateBlogForm.controls['blogDescription'].setValue(blog.blogDescription);
    this.updateBlogForm.controls['imageUrl'].setValue(blog.imageUrl);
  }

  updateBlog(id:any,blog:any){
  
    this.service.updateblog(id,blog).subscribe(( res:any)=>{
      if (res.statusCode == 200) {
        this.snakebar.open("Blog Updated Sucessfully!",'',{
          duration:3000,
          verticalPosition:'top'
        })
      } else {
        this.snakebar.open("somthing went wrong!",'retry',{
          duration:3000,
          verticalPosition:'top'
        })
      }
      this.getblogs();
    }); 
    let ref=document.getElementById('cancel');
      ref?.click();
  }


  deleteblog(blog:any){
    this.service.deleteblog(blog).subscribe((res:any)=>{
     if (res.statusCode == 200) {
       this.snakebar.open("Blog delete Sucessfully!",'',{
         duration:3000,
         verticalPosition:'top'
       })
     } else {
       this.snakebar.open("somthing went wrong!",'retry',{
         duration:3000,
         verticalPosition:'top'
       })
     }
     this.getblogs();
     
    })
 }
 

  viewblog(blog:any){
    this.route.navigate(['/viewblog'],{ state: { vblog : blog } })
  }
}
