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
    return this.afs
      .collection<Group>('groups', (ref) => ref.orderBy('idGroup', 'asc'))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        ),
        map((groups) =>
          groups.sort(
            (a, b) =>
              parseInt(a.idGroup!.toString()) - parseInt(b.idGroup!.toString())
          )
        )
      );
  }

  async createGroup(group: Group): Promise<void> {
    await this.groupsCollection.add(group);
  }

  getLastGroup(): Observable<Group | undefined> {
    return this.afs
      .collection<Group>('groups', (ref) =>
        ref.orderBy('idGroup', 'desc').limit(1)
      )
      .snapshotChanges()
      .pipe(
        map((actions) => {
          if (actions.length === 0) {
            return undefined;
          }
          const data = actions[0].payload.doc.data() as Group;
          const id = actions[0].payload.doc.id;
          return { id, ...data };
        })
      );
  }

  async updateUser(group: Partial<Group>): Promise<void> {
    const userRef = this.groupsCollection.doc(group.id!);
    await userRef.update(group);
  }
}
