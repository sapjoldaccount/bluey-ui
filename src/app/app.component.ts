import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skate';

  users: Observable<any[]>;

  constructor(firestore: AngularFirestore) {
    this.users = firestore.collection('users').valueChanges();
  }

  ngOnInit(): void {}
}
