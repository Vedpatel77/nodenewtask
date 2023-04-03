import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
blogd:any;
  constructor(private http : HttpClient, private router:Router){
   
  }
  blogdata = new FormGroup({
    blogerEmail : new FormControl(''),
    blogTitle : new FormControl(''),
    blogsummary : new FormControl(''),
    blogDescription : new FormControl(''),
    imageUrl : new FormControl('')
  })
  bolgdetail(blog:any){
      this.http.post('http://localhost:3000/addblog',blog).subscribe((res)=>{
        console.log(res);
        this.blogd=res;
        this.router.navigate(['/blogslist']);
        // this.router.navigate(['/blogslist'], { state: { blogs: this.blogd } });
      });
  }

}
