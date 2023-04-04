import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit{
// blogd:any;
  constructor(public service:NodeService, private router:Router ,private snakebar:MatSnackBar){
   
  }

  ngOnInit(): void {
    
  }

  blogdata = new FormGroup({
    blogerEmail : new FormControl(''),
    blogTitle : new FormControl(''),
    blogsummary : new FormControl(''),
    blogDescription : new FormControl(''),
    imageUrl : new FormControl('')
  })
  bolgdetail(blog:any){
      this.service.addblog(blog).subscribe((res:any)=>{
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
 

}
