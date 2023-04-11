import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
// import Socket from 'socket.io-client';
// const socketio = Socket('http://localhost:3000');



platformBrowserDynamic().bootstrapModule(AppModule)
.catch(err => console.error(err));
