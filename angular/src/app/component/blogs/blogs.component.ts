import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
blogd:any;
  constructor(public service:NodeService, private router:Router){
   
  }
  blogdata = new FormGroup({
    blogerEmail : new FormControl(''),
    blogTitle : new FormControl(''),
    blogsummary : new FormControl(''),
    blogDescription : new FormControl(''),
    imageUrl : new FormControl('')
  })
  bolgdetail(blog:any){
      this.service.addblog(blog).subscribe((res)=>{
        this.blogd=res;
        this.router.navigate(['/blogslist']);
      });
  }
 

}
