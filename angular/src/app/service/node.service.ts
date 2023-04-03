import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  //loginuser detail
  loginuser: any;
  //registeruser detail
  regiteruser: any;
  constructor(public http: HttpClient, private route: Router) { }

  register(Data: any) {
    console.log(Data);

    if (Data.firstName === '' && Data.lastName === '' && Data.email === '' && Data.number === '' && Data.password === '') {
      alert("Please Check The Field");
    }
    else {
      this.http.post('http://localhost:3000/users', Data)
        .subscribe((res) => {
          this.regiteruser = res;
          alert("register successful!");
          this.route.navigate(['/login']);
        })

    }
  }

    login(Data: any){
      
      if(Data.email === '' && Data.password === ''){
        alert("Please Check The Field");
      }
      this.http.post('http://localhost:3000/login', Data, { withCredentials: true }).subscribe((res) => {
        this.loginuser = [res]
        if (this.loginuser.length == 1) {
          alert("login successful!");
          sessionStorage.setItem("user", JSON.stringify(this.loginuser[0]));
          this.route.navigate(['/home']);
        } else {
          alert("invalid login credential!");
          this.route.navigate(['/login']);
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
      }).subscribe((res) => {
        console.log(res);
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
