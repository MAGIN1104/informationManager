import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { UserResponse, UserSave } from '../interfaces/User.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<any>;
  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<any>('user');
  }

  getUsers(): Observable<UserResponse[]> {
    return this.usersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }
  

  async addUser(newUser: UserSave): Promise<void> {
    await this.usersCollection.add(newUser);
  }

  async updateUser(user: Partial<UserSave>): Promise<void> {
    const userRef = this.usersCollection.doc(user.id!);
    await userRef.update(user);
  }

  async deleteUser(user: Partial<UserSave>): Promise<void> {
    const userRef = this.usersCollection.doc(user.id!);
    await userRef.delete();
  }

  getBirthdaysForThisWeek(): Observable<UserResponse[]> {
    const today = moment();

    const startOfWeek = today.startOf('isoWeek');
    
    const endOfWeek = startOfWeek.clone().endOf('isoWeek');

    const startMonthDay = startOfWeek.format('MM-DD');
    const endMonthDay = endOfWeek.format('MM-DD');

    return this.usersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions
          .map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            const birthDate = moment(data.birthDate.toDate());
            const birthMonthDay = birthDate.format('MM-DD');

            if (birthMonthDay >= startMonthDay && birthMonthDay <= endMonthDay) {
              return { id, ...data };
            }
            return null;
          })
          .filter(user => user !== null)
      )
    );
  }
}
