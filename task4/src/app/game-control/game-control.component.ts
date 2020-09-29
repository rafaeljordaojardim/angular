import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  timer;
  @Output() intervalFired = new EventEmitter<number>();
  lastNumber = 0;
  // count: number;
  // numbers: number[];
  constructor() {
    // this.count = 0;
    // this.numbers = [];
  }

  ngOnInit(): void {
  }

  onStart() {
    this.timer = setInterval(() => {
      // this.numbers.push(this.count++);
      this.intervalFired.emit(++this.lastNumber);
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    // this.numbers = [];
    // this.count = 0;
  }
}
