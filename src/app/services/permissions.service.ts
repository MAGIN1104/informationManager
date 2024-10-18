import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(private firestore: AngularFirestore) {}

  findByEmail(email: string): Observable<any> {
    return this.firestore
      .collection('adm_users', (ref) => ref.where('email', '==', email))
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            if (typeof data === 'object' && data !== null) {
              return { id, ...data };
            } else {
              return { id }; // Si data no es un objeto, devolvemos solo el ID
            }
          })
        )
      );
  }
}
