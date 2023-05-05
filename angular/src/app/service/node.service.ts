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

  user: any;
  ouser: any;

  constructor(public http: HttpClient, private route: Router, private snakebar: MatSnackBar) { }

  register(Data: any) {
    console.log(Data);

    if (Data.firstName === '' && Data.lastName === '' && Data.email === '' && Data.number === '' && Data.password === '') {

      this.snakebar.open("Plese check The feild", "okay..", {
        duration: 3000,
        verticalPosition: 'top',
      })

    }
    else {
      this.http.post('http://localhost:3000/users', Data)
        .subscribe((res: any) => {
          // console.log(res);
          if (res.res.statusCode == 200) {

            this.regiteruser = res.saveUser;
            this.snakebar.open("Register Sucessfully!", '', {
              duration: 3000,
              verticalPosition: 'top'
            })
            this.route.navigate(['/login']);

          }

        }, (err) => {
          if (err.status == 400) {
            this.snakebar.open("Plese check all the feild!", 'retry', {
              duration: 3000,
              verticalPosition: 'top'
            })
          }
          else {
            this.snakebar.open("something went wrong!", 'retry', {
              duration: 3000,
              verticalPosition: 'top'
            })
          }
        })

    }
  }

  iswritter() {
    this.user = sessionStorage.getItem('user');
    this.ouser = JSON.parse(this.user);
    if (this.ouser.role == "writter") {
      return true;
    } else {
      return false;
    }
  }
  isadmin() {
    this.user = sessionStorage.getItem('user');
    this.ouser = JSON.parse(this.user);
    if (this.ouser.role == "admin") {
      return true;
    } else {
      return false;
    }
  }
  // getuser(){
  //   let user = sessionStorage.getItem('user');
  //    = JSON.parse(this.Data);
  // }

  login(Data: any) {
// console.log(Data,"login");

    if (Data.email === '' && Data.password === '') {
      this.snakebar.open("Please Check The Field!", '', {
        duration: 3000,
        verticalPosition: 'top'
      })
    }
    else {
      this.http.post('http://localhost:3000/login', Data, { withCredentials: true, observe: 'response', responseType: "json" }).subscribe((res: any) => {
      //  console.log(res,"abc");
       
        if (res.body.res.statusCode == 200) {
          this.loginuser = [res.body.user]
          console.log(this.loginuser);

          
            sessionStorage.setItem("user", JSON.stringify(this.loginuser[0]));

            localStorage.setItem("access_token", res.body.jwt.access_token);
            localStorage.setItem("referesh_token", res.body.jwt.refresh_token);

            this.snakebar.open("login successfully!", 'okay', {
              duration: 2000,
              verticalPosition: 'top'
            })
            // alert("login successful");
            
            this.route.navigate(['/blogslist']);
          
        }
      }, (error:any) => {
        console.log(error);
        
        if (error.status == 401) {
          this.snakebar.open("Invalid login!", '', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }
        else if (error.status == 400) {
          this.snakebar.open("something went wrong", 'retry', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }
        else {
          this.snakebar.open("something went wrong", 'retry', {
            duration: 3000,
            verticalPosition: 'top'
          })
        }
      })
    }
  }

  getuser(page: number, limit: number) {    
    return this.http.get(`http://localhost:3000/tabledata?page=${page}&limit=${limit}`);
  }
  
  getuserblog(id: any) {
    
    return this.http.get('http://localhost:3000/myblog/'+id);
  }

  getblog() {
    return this.http.get('http://localhost:3000/blogdata')
  }

  viewuser(id: any) {
    return this.http.get(`http://localhost:3000/users/${id}`);
  }

  addblog(blog: any, image: any) {
    let testData: FormData = new FormData();
    console.log(blog);


    testData.append('blogerEmail', blog.blogerEmail);
    testData.append('blogTitle', blog.blogTitle);
    testData.append('blogsummary', blog.blogsummary);
    testData.append('blogDescription', blog.blogDescription);
    testData.append('user_id', blog.userid);
    testData.append('imageFile', image);


    return this.http.post('http://localhost:3000/addblog', testData);
  }

  updateuser(id: any, data: any) {
    return this.http.patch(`http://localhost:3000/users/${id}`, data);
  }

  updateblog(id: any, blog: any) {
    return this.http.patch(`http://localhost:3000/blogdata/${id}`, blog);
  }

  deleteuser(id: any) {
    return this.http.delete(`http://localhost:3000/users/${id}`);
  }

  deleteblog(blog: any) {
    return this.http.delete('http://localhost:3000/blogdata/' + blog._id);
  }


  logout() {
    // this.Data = sessionStorage.getItem('user');
    // this.id = JSON.parse(this.Data)
    this.http.get('http://localhost:3000/logout', {
      withCredentials: true
    }).subscribe((res: any) => {

      if (res.statusCode == 200) {
        this.snakebar.open("logout successfully!", '', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
      else if (res.statusCode == 400) {
        this.snakebar.open("Bad Request!", 'retry', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
      else {
        this.snakebar.open("something went wrong!", 'retry', {
          duration: 3000,
          verticalPosition: 'top'
        })
      }
    });
    sessionStorage.clear();
    localStorage.clear();
    this.route.navigate(['/login']);
  }

  isuserlogedin() {
    if (sessionStorage.length == 0) {
      return false;
    } else {
      return true;
    }
  }


  accessToken() {

    const token = localStorage.getItem('referesh_token')
    //  console.log(token,"all");


    return this.http.post("http://localhost:3000/refreshToken", { Token: token })
  }



}


