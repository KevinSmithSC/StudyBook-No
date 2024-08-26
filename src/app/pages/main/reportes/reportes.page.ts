import { Component, OnInit, inject } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de que la ruta es correcta
import jsPDF from 'jspdf';
import { UtilsService } from 'src/app/services/utils.service';
import { orderBy } from 'firebase/firestore';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  utilsSvcsb= inject(UtilsService)

  reservationssb: any[] = [];
  selectedOrdersb: string = 'sala';  // Default order by date

  constructor(private firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    await this.loadDatasb();
  }

  async loadDatasb() {
    const loading = await this.utilsSvcsb.loadingsb();
    await loading.present();
    this.reservationssb = await this.firebaseService.getAllReservationssb();
    this.ordenarReservacionessb();
    loading.dismiss();
  }

  ordenarReservacionessb() {
    if (this.selectedOrdersb === 'sala') {
      this.reservationssb.sort((a, b) => this.compareSalasb(a.sala, b.sala));
    } else if (this.selectedOrdersb === 'date') {
      this.reservationssb.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.selectedOrdersb === 'students') {
      this.reservationssb.sort((a, b) => a.students.join(', ').localeCompare(b.students.join(', ')));
    } else if (this.selectedOrdersb === 'horario') {
      this.reservationssb.sort((a, b) => a.horario.localeCompare(b.horario));
    }
  }
  
  compareSalasb(salaAsb: string, salaBsb: string): number {
    // Extraer el número de la cadena (asumiendo que siempre es "Sala " seguido de un número)
    const numAsb = parseInt(salaAsb.substr(5));
    const numBsb = parseInt(salaBsb.substr(5));
  
    return numAsb - numBsb;
  }
}
