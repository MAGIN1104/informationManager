import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { collection } from 'firebase/firestore';
@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private firestore: Firestore) {}

  getGroups(): Observable<any> {
    const groupsCollection = collection(this.firestore, 'groups');
    return collectionData(groupsCollection, {
      idField: 'id',
    }) as Observable<any>;
  }
}
