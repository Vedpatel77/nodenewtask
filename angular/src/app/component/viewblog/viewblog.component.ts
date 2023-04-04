import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewblog',
  templateUrl: './viewblog.component.html',
  styleUrls: ['./viewblog.component.css']
})
export class ViewblogComponent implements OnInit {
  blogdata:any;
    constructor(private router: Router) {
    this.blogdata =this.router.getCurrentNavigation()?.extras.state 
  }

  ngOnInit(): void {
    
  }
}
