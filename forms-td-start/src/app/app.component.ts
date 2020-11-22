import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', { static: true }) signupForm: NgForm; // access the property with the template name #f
  defaultQuestion = 'pet';
  answer = '';
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male'
    // }); it is not the best approach
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    });

  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);
    this.user = {
      username: this.signupForm.value.userData.username,
      email: this.signupForm.value.userData.email,
      secretQuestion: this.signupForm.value.secret,
      answer: this.signupForm.value.questionAnswer,
      gender: this.signupForm.value.gender
    };
    this.submitted = true;

    this.signupForm.reset();
  }
}
