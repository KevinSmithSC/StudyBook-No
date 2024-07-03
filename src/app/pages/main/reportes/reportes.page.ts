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

  utilsSvc= inject(UtilsService)

  reservations: any[] = [];
  selectedOrder: string = 'sala';  // Default order by date

  constructor(private firebaseService: FirebaseService) {
  }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    const loading = await this.utilsSvc.loading();
    await loading.present();
    this.reservations = await this.firebaseService.getAllReservations();
    this.ordenarReservaciones();
    loading.dismiss();
  }

  ordenarReservaciones() {
    if (this.selectedOrder === 'sala') {
      this.reservations.sort((a, b) => this.compareSala(a.sala, b.sala));
    } else if (this.selectedOrder === 'date') {
      this.reservations.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (this.selectedOrder === 'students') {
      this.reservations.sort((a, b) => a.students.join(', ').localeCompare(b.students.join(', ')));
    } else if (this.selectedOrder === 'horario') {
      this.reservations.sort((a, b) => a.horario.localeCompare(b.horario));
    }
  }
  
  compareSala(salaA: string, salaB: string): number {
    // Extraer el número de la cadena (asumiendo que siempre es "Sala " seguido de un número)
    const numA = parseInt(salaA.substr(5));
    const numB = parseInt(salaB.substr(5));
  
    return numA - numB;
  }

  // ======================================= PDF ===========================================
  logoURL = 'assets/icon/logo.png';
  imprimirPdf() {
    const doc = new jsPDF;

    //añadir titulo
    doc.setFontSize(25);
    this.addLogo(doc);
    doc.text('Reportes', 85, 105);

    let y = 120; //Posición incial en y

    this.reservations.forEach((reservations, index) => {
      if (y > 250) {
        doc.addPage();
        y = 35;
        doc.setFontSize(22);
        doc.text('Reportes', 85, 22);
        this.addLogoEsqui(doc);
      }

      //Sala
      doc.setFontSize(16);
      doc.text(`Sala: ${reservations.sala}`, 14, y);
      y += 10; //Espaciado entre reservaciones

      //Fecha y Horario
      doc.setFontSize(12);
      doc.text(`Fecha: ${reservations.date}`, 14, y)
      y += 10;
      doc.text(`Horario: ${reservations.horario}`, 14, y)
      y += 10;

      //Acompañantes
      doc.text(`Acompañantes: ${reservations.students}`, 14, y)
      y += 10;
      doc.text('===========================================================', 14, y)
      y += 10;
    });

    //Descargar el PDF
    doc.save('Reportes.pdf')
  }

  private addLogo(doc: jsPDF) {
    const img = new Image();
    img.src = this.logoURL;
    doc.addImage(img, 'PNG', 62, 5, 80, 80);
  }
  private addLogoEsqui(doc: jsPDF) {
    const img = new Image();
    img.src = this.logoURL;
    doc.addImage(img, 'PNG', 150, 10, 40, 40);
  }
}
