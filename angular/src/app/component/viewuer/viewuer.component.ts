import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeService } from 'src/app/service/node.service';

@Component({
  selector: 'app-viewuer',
  templateUrl: './viewuer.component.html',
  styleUrls: ['./viewuer.component.css']
})
export class ViewuerComponent implements OnInit {
  public data:any;
  public userId: any;

  constructor(private route: ActivatedRoute, public service:NodeService) {
    route.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }
  ngOnInit(): void {
    this.service.viewuser(this.userId).subscribe((res)=>{
      this.data=res;
    })
  }
}
