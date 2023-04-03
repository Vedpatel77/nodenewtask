import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent {
  blogdata:any;
    constructor(private router: Router) {
    this.blogdata =this.router.getCurrentNavigation()?.extras.state // should log out 'bar'
    console.log(this.blogdata);
    
  }
}
