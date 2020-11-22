

export class CounterService {
  inactiveUsers: number;
  activeUsers: number;

  countInactiveUsers(number: number) {
    this.inactiveUsers = number;
    console.log(`Inactive users: ${this.inactiveUsers}`);
  }

  countActiveUsers(number: number) {
    this.activeUsers = number;
    console.log(`Active users: ${this.activeUsers}`);
  }
}
