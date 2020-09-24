import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})

export class ServerComponent {
  serverId = 10;
  serverStatus = 'offline';
  username = '';

  getServerStatus() {
    return this.serverStatus;
  }

  reset() {
    this.username = '';
  }
}
