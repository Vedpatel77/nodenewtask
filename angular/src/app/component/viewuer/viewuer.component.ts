import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewuer',
  templateUrl: './viewuer.component.html',
  styleUrls: ['./viewuer.component.css']
})
export class ViewuerComponent implements OnInit {
  public data:any;
  public userId: any;

  constructor(route: ActivatedRoute, private http:HttpClient) {
    route.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }
  ngOnInit(): void {
    this.http.get(`http://localhost:3000/users/${this.userId }`).subscribe((res)=>{
      this.data=res;
      // console.log(this.data);
    })
  }
}
