import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../model/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, getDoc, doc, updateDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import { Observable, map } from 'rxjs';
import { orderBy } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  // =============ACCEDER
  sigIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.clave);
  }

    //=========RESTABLECER CONTRASEÑA=========
sendRecoveryEmail(email: string){
  return sendPasswordResetEmail(getAuth(), email)
  }

  // BD
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //==================CERRAR SESION========
  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/login')
  }

  // Método para actualizar un documento en Firestore
  async updateDocument(collection: string, docId: string, newData: any) {
    try {
      const docRef = doc(getFirestore(), collection, docId);
      await updateDoc(docRef, newData);
      console.log('Documento actualizado exitosamente en Firestore');
    } catch (error) {
      console.error('Error al actualizar documento en Firestore:', error);
      throw error;
    }
  }

  // =========== Obtener los reportes =============
  async getAllReservations() {
    const q = query(
      collection(getFirestore(), 'reservations'),
      orderBy('sala', 'asc') // Ordenar por fecha en orden ascendente
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => doc.data());
  }

  // =========== Obtener datos de salas ==============
  getSalasMantenimiento(): Observable<any[]> {
    return this.firestore.collection('mantenimiento').valueChanges({ idField: 'id' });
  }

  getSalaById(id: string): Observable<any> {
    return this.firestore.collection('mantenimiento').doc(id).valueChanges();
  }


  // ================== Gestion reservadas ======================
  getDisabledSlots(): Observable<any[]> {
    return this.firestore.collection('disabledSlots').snapshotChanges();
  }

  updateDisabledSlotStatus(uid: string, status: boolean): Promise<void> {
    return this.firestore.collection('disabledSlots').doc(uid).update({ disabled: status });
  }



  // ========================= Gestión de penalización =============================================
 // Obtener todos los usuarios con disabled = true en tiempo real
 getDisabledUsers(): Observable<any[]> {
  return this.firestore.collection('users', ref => ref.where('disabled', '==', true))
    .snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as any;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
}

updateUserDisabledStatus(email: string, disabled: boolean): Promise<void> {
  return this.firestore.collection('users', ref => ref.where('email', '==', email))
    .get().toPromise()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        const doc = querySnapshot.docs[0];
        return doc.ref.update({ disabled: disabled });
      } else {
        throw new Error(`No se encontró ningún usuario con el email ${email}`);
      }
    });
}
}