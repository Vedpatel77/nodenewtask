import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
//   constructor(private router: Router) {
//     this.blogdata =this.router.getCurrentNavigation()?.extras.state // should log out 'bar'
//   }
ngOnInit(): void {
  this.getblogs();
}
constructor(private http:HttpClient,private route:Router){}

updateBlogForm = new FormGroup({
  blogTitle : new FormControl(''),
  blogsummary : new FormControl(''),
  blogDescription : new FormControl(''),
  imageUrl : new FormControl(''),
})

getblogs(){
  this.http.get('http://localhost:3000/blogdata').subscribe((res)=>{
    // console.log(res);
  this.blogdata=res;
  
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
  // console.log(id);
  // console.log(blog);
  
  
  this.http.patch(`http://localhost:3000/blogdata/${id}`,blog).subscribe(( res)=>{
    this.getblogs();
  }); 
  let ref=document.getElementById('cancel');
    ref?.click();
}
deleteblog(blog:any){
   this.http.delete('http://localhost:3000/blogdata'+'/'+blog._id).subscribe((res)=>{
    console.log(res);
    this.getblogs();
    
   })
}
viewblog(blog:any){
  this.route.navigate(['/viewblog'],{ state: { vblog : blog } })
}
}
