import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-gestionreserva',
  templateUrl: './gestionreserva.page.html',
  styleUrls: ['./gestionreserva.page.scss'],
})
export class GestionreservaPage implements OnInit {
  disabledSlotssb: any[] = [];
  firebaseSvcsb = inject(FirebaseService);
  utilsSvcsb = inject(UtilsService);

  constructor() { }

  async ngOnInit() {
    const loading = await this.utilsSvcsb.loadingsb();
    await loading.present();
    this.firebaseSvcsb.getDisabledSlotssb().subscribe(slots => {
      console.log('Disabled slots:', slots); // Verifica aquí los datos que recibes de Firestore
      this.disabledSlotssb = slots
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

  releaseSlotsb(uidsb: string) {
    this.firebaseSvcsb.updateDisabledSlotStatussb(uidsb, false).then(() => {
      this.disabledSlotssb = this.disabledSlotssb.map(slot => 
        slot.uid === uidsb ? { ...slot, disabled: false } : slot
      );
    }).catch(error => {
      console.error('Error updating slot status: ', error);
    });
  }
}
