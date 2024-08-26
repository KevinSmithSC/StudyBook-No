import { Component, OnInit } from '@angular/core';
import { orderBy } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de que la ruta es correcta


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  salassb: any[] = [];
  selectedSalasb: string;
  datosSalasb: any;
  datosSalaItemssb: any[] = [];

  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    // Obtener la lista de salas desde la colección "mantenimiento"
    this.firebaseService.getSalasMantenimientosb().subscribe(salas => {
      // Ordenar las salas numéricamente
      this.salassb = salas.sort((a, b) => {
        const numA = parseInt(a.nombre.split(' ')[1], 10); // Extraer el número de la cadena
        const numB = parseInt(b.nombre.split(' ')[1], 10);
        return numA - numB;
      });

      if (this.salassb.length > 0) {
        this.selectedSalasb = this.salassb[0].id;
        this.cambiarSalasb();
      }
    });
  }

  cambiarSalasb() {
    // Obtener los datos de la sala seleccionada
    if (this.selectedSalasb) {
      this.firebaseService.getSalaByIdsb(this.selectedSalasb).subscribe(datosSala => {
        this.datosSalasb = datosSala;
        this.actualizarDatosSalaItemssb();
      });
    }
  }

  actualizarDatosSalaItemssb() {
    // Actualizar los datos de la sala seleccionada
    this.datosSalaItemssb = [
      { titulosb: 'Encargado', valorsb: this.datosSalasb.encargado},
      { titulosb: 'Computadora', valorsb: this.datosSalasb.computadora},
      { titulosb: 'Pizarra', valorsb: this.datosSalasb.pizarra},
      { titulosb: 'Mesa', valorsb: this.datosSalasb.mesa},
      { titulosb: 'Mota', valorsb: this.datosSalasb.mota},
      { titulosb: 'Plumones', valorsb: this.datosSalasb.plumon},
      { titulosb: 'Sillas', valorsb: this.datosSalasb.sillas}
    ];
  }

  compareSalasb(a: any, b: any): number {
    const numA = parseInt(a.nombre.split(' ')[1], 10); // Extraer el número de la cadena
    const numB = parseInt(b.nombre.split(' ')[1], 10);
    return numA - numB;
  }
}