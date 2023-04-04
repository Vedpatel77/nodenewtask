import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class NodeService {
  //loginuser detail
  loginuser: any;
  //registeruser detail
  regiteruser: any;
  
  constructor(public http: HttpClient, private route: Router,private snakebar:MatSnackBar) { }

  register(Data: any) {
    console.log(Data);

    if (Data.firstName === '' && Data.lastName === '' && Data.email === '' && Data.number === '' && Data.password === '') {
    
      this.snakebar.open("Plese check The feild","okay..",{
        duration:3000,
        verticalPosition:'top',
      })
      
    }
    else {
      this.http.post('http://localhost:3000/users', Data)
        .subscribe((res:any) => {
          // console.log(res);
          if (res.res.statusCode == 200) {
            
            this.regiteruser = res.saveUser;
            this.snakebar.open("Register Sucessfully!",'',{
              duration:3000,
              verticalPosition:'top'
            })
            this.route.navigate(['/login']);

          }
          else if(res.statusCode == 400){
            this.snakebar.open("something went wrong!",'retry',{
              duration:3000,
                verticalPosition:'top'
              })
          } 
          else {
            this.snakebar.open("something went wrong!",'retry',{
              duration:3000,
                verticalPosition:'top'
              })
          }
        })

    }
  }

    login(Data: any){
      
      if(Data.email === '' && Data.password === ''){
        this.snakebar.open("Please Check The Field!",'',{
          duration:3000,
          verticalPosition:'top'
        })
      }
      this.http.post('http://localhost:3000/login', Data, { withCredentials: true }).subscribe((res:any) => {
        console.log('shkjgfkashdfgsajdhfg',res);
        if (res.res.statusCode == 200) {
          this.loginuser = [res.user]
          if (this.loginuser.length == 1) {
            this.snakebar.open("login successfully!",'',{
            duration:3000,
              verticalPosition:'top'
            })
            sessionStorage.setItem("user", JSON.stringify(this.loginuser[0]));
            this.route.navigate(['/home']);
          } 
        } else if(res.statusCode == 401) {
          this.snakebar.open("Invalid login!",'',{
            duration:3000,
              verticalPosition:'top'
            })
        }
         else if(res.res.statusCode == 400) {
          this.snakebar.open("something went wrong",'retry',{
            duration:3000,
              verticalPosition:'top'
            })
        }
        else{
          this.snakebar.open("something went wrong",'retry',{
            duration:3000,
              verticalPosition:'top'
            })
        }
        
       
      })
    }

    getuser(){
      return this.http.get('http://localhost:3000/tabledata');
    }

    getblog(){
      return this.http.get('http://localhost:3000/blogdata');
    }

    viewuser(id:any){
      return this.http.get(`http://localhost:3000/users/${id}`);
    }

    addblog(blog:any){
      return this.http.post('http://localhost:3000/addblog',blog);
    }

    updateuser(id:any,data:any){
      return this.http.patch(`http://localhost:3000/users/${id}`,data);
    }

    updateblog(id: any, blog: any){
      return this.http.patch(`http://localhost:3000/blogdata/${id}`, blog);
    }

    deleteuser(id:any){
      return this.http.delete(`http://localhost:3000/users/${id}`);
    }

    deleteblog(blog: any){
      return this.http.delete('http://localhost:3000/blogdata/' + blog._id);
    }


    logout(){
      // this.Data = sessionStorage.getItem('user');
      // this.id = JSON.parse(this.Data)
      this.http.get('http://localhost:3000/logout', {
        withCredentials: true
      }).subscribe((res:any) => {
        
          if (res.statusCode == 200) {
            this.snakebar.open("logout successfully!",'',{
              duration:3000,
                verticalPosition:'top'
              })
          }
          else if(res.statusCode == 400){
            this.snakebar.open("Bad Request!",'retry',{
              duration:3000,
                verticalPosition:'top'
              })
          }
          else{
            this.snakebar.open("something went wrong!",'retry',{
              duration:3000,
                verticalPosition:'top'
              })
          }
      });
      sessionStorage.clear();
      this.route.navigate(['/login']);
    }

    isuserlogedin(){
      if (sessionStorage.length == 0) {
        return false;
      } else {
        return true;
      }
    }




  }
