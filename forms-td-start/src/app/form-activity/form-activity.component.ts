import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-activity',
  templateUrl: './form-activity.component.html',
  styleUrls: ['./form-activity.component.css']
})
export class FormActivityComponent implements OnInit {
  @ViewChild('f', {static: false}) formActivity: NgForm;
  defaultSelect = 'advanced';
  formResponse;
  submitted = false;
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log({...this.formActivity.value});
    this.formResponse = { ...this.formActivity.value };
    this.submitted = true;
    this.formActivity.reset({ select: this.defaultSelect });
  }
}
