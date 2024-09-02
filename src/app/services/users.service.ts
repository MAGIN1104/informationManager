import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { UserResponse, UserSave } from '../interfaces/User.interface';

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
}
