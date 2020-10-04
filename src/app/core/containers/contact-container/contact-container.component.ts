import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsService } from 'src/app/shared/services/aws/aws.service';
import { LogService } from 'src/app/shared/services/log/log.service';

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

  submit(): void {
    const submission: any = {
      first: this.first.value,
      last: this.last.value,
      email: this.email.value,
      message: this.message.value,
    };

    this.aws.sendEmail(submission).subscribe(
      (success) => {
        this.log.logDebug('Delivered email successfully.');
      },
      (err) => {
        // TODO: error handling
        console.log('err');
      },
      () => {
        this.contactForm.reset();
      }
    );
  }

  constructor(private aws: AwsService, private log: LogService) {}

  ngOnInit(): void {}
}
