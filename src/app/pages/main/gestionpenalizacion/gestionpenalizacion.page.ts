import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-gestionpenalizacion',
  templateUrl: './gestionpenalizacion.page.html',
  styleUrls: ['./gestionpenalizacion.page.scss'],
})
export class GestionpenalizacionPage implements OnInit {
  users: any[];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.getDisabledUsers();
  }

  getDisabledUsers() {
    this.firebaseService.getDisabledUsers().subscribe(
      (users) => {
        this.users = users;
        console.log('Usuarios con disabled true:', this.users);
      },
      (error) => {
        console.error('Error al obtener usuarios con disabled true:', error);
      }
    );
  }

  liberarUsuario(email: string) {
    this.firebaseService.updateUserDisabledStatus(email, false)
      .then(() => {
        console.log('Estado de usuario actualizado correctamente.');
        // Puedes agregar más lógica aquí si es necesario
      })
      .catch((error) => {
        console.error('Error al actualizar el estado de usuario:', error);
        // Manejar el error según sea necesario
      });
  }
}
