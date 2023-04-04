import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private route: ActivatedRoute, public service:NodeService,private snakebar:MatSnackBar) {
    route.params.subscribe((params) => {
      this.userId = params["id"];
    });
  }
  ngOnInit(): void {
    this.service.viewuser(this.userId).subscribe((res:any)=>{
      
      this.data=res._doc;
      if (res.res.statusCode == 200) {
        this.snakebar.open("your profile!",'',{
          duration:2000,
            verticalPosition:'top'
          })
      } else {
        this.snakebar.open("something went wrong!",'retry',{
          duration:3000,
            verticalPosition:'top'
          })
      }
    })
  }
}
