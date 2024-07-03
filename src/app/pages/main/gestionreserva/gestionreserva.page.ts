import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-gestionreserva',
  templateUrl: './gestionreserva.page.html',
  styleUrls: ['./gestionreserva.page.scss'],
})
export class GestionreservaPage implements OnInit {
  disabledSlots: any[] = [];
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  constructor() { }

  async ngOnInit() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.firebaseSvc.getDisabledSlots().subscribe(slots => {
      console.log('Disabled slots:', slots); // Verifica aquí los datos que recibes de Firestore
      this.disabledSlots = slots
        .filter(slot => slot.payload.doc.data().disabled === true)
        .map(slot => ({
          uid: slot.payload.doc.id,
          ...slot.payload.doc.data()
        }))
        .sort((a, b) => a.uid.localeCompare(b.uid, undefined, { numeric: true })); // Ordena los slots aquí
      loading.dismiss();
    }, error => {
      loading.dismiss();
      console.error('Error getting disabled slots: ', error);
    });
  }

  releaseSlot(uid: string) {
    this.firebaseSvc.updateDisabledSlotStatus(uid, false).then(() => {
      this.disabledSlots = this.disabledSlots.map(slot => 
        slot.uid === uid ? { ...slot, disabled: false } : slot
      );
    }).catch(error => {
      console.error('Error updating slot status: ', error);
    });
  }
}
