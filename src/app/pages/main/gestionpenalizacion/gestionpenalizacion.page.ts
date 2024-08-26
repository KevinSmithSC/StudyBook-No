import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-gestionpenalizacion',
  templateUrl: './gestionpenalizacion.page.html',
  styleUrls: ['./gestionpenalizacion.page.scss'],
})
export class GestionpenalizacionPage implements OnInit {
  userssb: any[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getDisabledUserssb();
  }

  getDisabledUserssb() {
    this.firebaseService.getDisabledUserssb().subscribe(
      (users) => {
        this.userssb = users;
        console.log('Usuarios desactivados:', this.userssb);
      },
      (error) => {
        console.error('Error al obtener usuarios desactivados:', error);
      }
    );
  }

  liberarUsuariosb(email: string) {
    this.firebaseService.updateUserDisabledStatussb(email, false)
      .then(() => {
        console.log('Estado de usuario actualizado correctamente.');
      })
      .catch((error) => {
        console.error('Error al actualizar el estado de usuario:', error);
      });
  }
}
