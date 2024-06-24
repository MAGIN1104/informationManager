import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  addDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserResponse, UserSave } from '../interfaces/User.interface';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

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

  async updateUser(user: Partial<UserSave>): Promise<void> {
    const userDocRef = doc(this.firestore, 'user', user.id!); // Referencia al documento del usuario
    console.log('USUARIO ENCONTRADO', userDocRef);
    await updateDoc(userDocRef, user); // Actualizar el documento con los nuevos datos
  }

  async deleteUser(user: Partial<UserSave>): Promise<void> {
    const userDocRef = doc(this.firestore, 'user', user.id!); // Referencia al documento del usuario
    await deleteDoc(userDocRef); // Actualizar el documento con los nuevos datos
  }
}
