import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  counter: number = 100;

  constructor() { }

  ngOnInit(): void {
  }

  incrementCounter(){
    this.counter++;
  }

  decrementCounter(){
    this.counter--;
  }

  handleChange() {
    console.log(this.counter);
    
  }
}
