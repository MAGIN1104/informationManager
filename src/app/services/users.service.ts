import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserResponse, UserSave } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private firestore: Firestore) {}

  getUsers(): Observable<UserResponse[]> {
    const usersCollection = collection(this.firestore, 'user');
    return collectionData(usersCollection, { idField: 'id' }) as Observable<
      UserResponse[]
    >;
  }

  async postUser(newUser: UserSave): Promise<void> {
    const usersCollection = collection(this.firestore, 'user');
    await addDoc(usersCollection, newUser);
  }
}
