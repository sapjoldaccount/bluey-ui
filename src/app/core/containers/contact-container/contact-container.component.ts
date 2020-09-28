import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './contact-container.component.html',
  styleUrls: ['./contact-container.component.scss'],
})
export class ContactContainerComponent implements OnInit {
  first = new FormControl('', [Validators.required]);
  last = new FormControl('', [Validators.required]);
  message = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);

  contactForm: FormGroup = new FormGroup({
    first: this.first,
    last: this.last,
    message: this.message,
    email: this.email,
  });

  // TODO: make dynamic func
  getMessageErrorMessage(): string {
    if (this.message.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getFirstErrorMessage(): string {
    if (this.first.hasError('required')) {
      return 'You must enter a value';
    }
  }

  getLastErrorMessage(): string {
    if (this.last.hasError('required')) {
      return 'You must enter a value';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
