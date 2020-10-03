import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @ViewChild('alert', { static: true }) alert: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  closeAlert(): void {
    this.alert.nativeElement.classList.remove('show');
  }

  showSuccessAlert(title: string, message: string): void {
    this.alert.nativeElement.classList.add('show');
  }
}
