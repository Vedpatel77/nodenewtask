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
export class BloglistComponent implements OnInit {
  blogdata: any;
  isadmin1: any;
  editblogdataid: any;
  Odata: any;
  data: any;
  file: any;

  ngOnInit(): void {
    this.getblogs();
  }
  constructor(public service: NodeService, private route: Router, private snakebar: MatSnackBar) { }

  updateBlogForm = new FormGroup({
    blogTitle: new FormControl(''),
    blogsummary: new FormControl(''),
    blogDescription: new FormControl(''),
    imageFile: new FormControl(''),
  })

  getblogs() {
    this.service.getblog().subscribe((res: any) => {
      console.log(res);

      this.blogdata = res.blogs;

      if (res.statusCode == 400) {
        this.snakebar.open("somthing went wrong!", 'retry', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }

    })
  }

  isadmin() {
    this.data = sessionStorage.getItem('user');
    this.Odata = JSON.parse(this.data);
    console.log(this.Odata);
    if (this.Odata === null) {
      return false;
    } else if (this.Odata.role === "admin") {
      return true;
    }
    else {
      return false;
    }
  }

  editblog(blog: any) {
    // console.log(blog);

    this.editblogdataid = blog._id;
    this.updateBlogForm.controls['blogTitle'].setValue(blog.blogTitle);
    this.updateBlogForm.controls['blogsummary'].setValue(blog.blogsummary);
    this.updateBlogForm.controls['blogDescription'].setValue(blog.blogDescription);
    // this.updateBlogForm.controls['imageFile'].setValue(blog.imageFile);

  }
  updateBlog(id: any, blog: any) {
    let testData: FormData = new FormData();

    testData.append('blogTitle', blog.blogTitle);
    testData.append('blogsummary', blog.blogsummary);
    testData.append('blogDescription', blog.blogDescription);
    if (this.file) {

      testData.append('imageFile', this.file);
    }
    console.log(testData);

    // testData.append('imageFile', this.file);
    this.service.updateblog(id, testData).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.snakebar.open("Blog Updated Sucessfully!", '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      } else {
        this.snakebar.open("somthing went wrong!", 'retry', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
      this.getblogs();
    });
    let ref = document.getElementById('cancel');
    ref?.click();
  }
  deleteblog(blog: any) {
    this.service.deleteblog(blog).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.snakebar.open("Blog delete Sucessfully!", '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      } else {
        this.snakebar.open("somthing went wrong!", 'retry', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
      this.getblogs();

    })
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];

  }

  viewblog(blog: any) {
    this.route.navigate(['/viewblog'], { state: { vblog: blog } })
  }
}
