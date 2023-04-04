import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-bloglist',
  templateUrl: './bloglist.component.html',
  styleUrls: ['./bloglist.component.css']
})
export class BloglistComponent implements OnInit{
blogdata:any;
editblogdataid:any;
  Odata: any;
  data: any;

ngOnInit(): void {
  this.getblogs();
}
constructor(public service:NodeService,private route:Router,private snakebar : MatSnackBar){}

updateBlogForm = new FormGroup({
  blogTitle : new FormControl(''),
  blogsummary : new FormControl(''),
  blogDescription : new FormControl(''),
  imageUrl : new FormControl(''),
})

getblogs(){
  this.service.getblog().subscribe((res:any)=>{
    this.blogdata=res.blogs;
    if (res.statusCode == 400) {
      this.snakebar.open("somthing went wrong!",'retry',{
        duration:3000,
        verticalPosition:'top'
      })
    } 
  
  })
}

isadmin(){
  this.data = sessionStorage.getItem('user');
  this.Odata = JSON.parse(this.data);
  if(this.Odata.role == "admin"){
    return true;
  }else{
    return false;
  }
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
