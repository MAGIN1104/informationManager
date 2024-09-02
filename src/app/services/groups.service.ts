import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Group } from '../interfaces/Groups.interface';

@Injectable({ providedIn: 'root' })
export class GroupsService {
  private groupsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.groupsCollection = afs.collection<any>('groups');
  }

  getGroups(): Observable<Group[]> {
    return this.groupsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  async createGroup(group: Group): Promise<void> {
    await this.groupsCollection.add(group);
  }

  async updateUser(group: Partial<Group>): Promise<void> {
    const userRef = this.groupsCollection.doc(group.id!);
    await userRef.update(group);
  }
}
