import { Component, OnInit } from '@angular/core';
import Socket from 'socket.io-client';
const socketio = Socket('http://localhost:3000',{ transports: ['websocket', 'polling', 'flashsocket'] });
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular';
  constructor(){
     
  }
  ngOnInit(): void {
    socketio.on('connect',()=>{
      console.log(socketio.id);
      socketio.emit('message',"hii this is from client")
      socketio.on('servermessage',(msg)=>{
        console.log("servermsg:"+msg);
        
      })
    })
  }
}
