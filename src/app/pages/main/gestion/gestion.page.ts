import { Component, OnInit } from '@angular/core';
import { orderBy } from 'firebase/firestore';
import { FirebaseService } from 'src/app/services/firebase.service'; // Asegúrate de que la ruta es correcta


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
})
export class GestionPage implements OnInit {

  salas: any[] = [];
  selectedSala: string;
  datosSala: any;
  datosSalaItems: any[] = [];

  
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    // Obtener la lista de salas desde la colección "mantenimiento"
    this.firebaseService.getSalasMantenimiento().subscribe(salas => {
      // Ordenar las salas numéricamente
      this.salas = salas.sort((a, b) => {
        const numA = parseInt(a.nombre.split(' ')[1], 10); // Extraer el número de la cadena
        const numB = parseInt(b.nombre.split(' ')[1], 10);
        return numA - numB;
      });

      if (this.salas.length > 0) {
        this.selectedSala = this.salas[0].id;
        this.cambiarSala();
      }
    });
  }

  cambiarSala() {
    // Obtener los datos de la sala seleccionada
    if (this.selectedSala) {
      this.firebaseService.getSalaById(this.selectedSala).subscribe(datosSala => {
        this.datosSala = datosSala;
        this.actualizarDatosSalaItems();
      });
    }
  }

  actualizarDatosSalaItems() {
    // Actualizar los datos de la sala seleccionada
    this.datosSalaItems = [
      { titulo: 'Encargado', valor: this.datosSala.encargado, icon: '../assets/assetsmari/icon/jefe.png' },
      { titulo: 'Computadora', valor: this.datosSala.computadora, icon: '../assets/assetsmari/icon/Compu.png' },
      { titulo: 'Pizarra', valor: this.datosSala.pizarra, icon: '../assets/assetsmari/icon/pizarra.png' },
      { titulo: 'Mesa', valor: this.datosSala.mesa, icon: '../assets/assetsmari/icon/mesa.png' },
      { titulo: 'Mota', valor: this.datosSala.mota, icon: '../assets/assetsmari/icon/mota.png' },
      { titulo: 'Plumones', valor: this.datosSala.plumon, icon: '../assets/assetsmari/icon/plumones.png' },
      { titulo: 'Sillas', valor: this.datosSala.sillas, icon: '../assets/assetsmari/icon/silla.png' }
    ];
  }

  compareSala(a: any, b: any): number {
    const numA = parseInt(a.nombre.split(' ')[1], 10); // Extraer el número de la cadena
    const numB = parseInt(b.nombre.split(' ')[1], 10);
    return numA - numB;
  }
}