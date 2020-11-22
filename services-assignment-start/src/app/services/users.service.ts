import { Injectable, EventEmitter } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UsersService {
  activeUsers = ['Max', 'Anna'];
  inactiveUsers = ['Chris', 'Manu'];

  constructor(private counterService: CounterService) {}

  onSetToInactive(id: number) {
    this.inactiveUsers.push(this.activeUsers[id]);
    this.activeUsers.splice(id, 1);
    this.counterService.countInactiveUsers(this.inactiveUsers.length);
    this.counterService.countActiveUsers(this.activeUsers.length);
  }

  onSetToActive(id: number) {
    this.activeUsers.push(this.inactiveUsers[id]);
    this.inactiveUsers.splice(id, 1);
    this.counterService.countInactiveUsers(this.inactiveUsers.length);
    this.counterService.countActiveUsers(this.activeUsers.length);
  }
}
