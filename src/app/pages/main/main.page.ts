import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router'
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Reportes', url: '/main/reportes', icon: 'reader-outline' },
    { title: 'Mantenimiento', url: '/main/mantenimiento', icon: 'construct-outline' },
    { title: 'Gestión de salas', url: '/main/gestion', icon: 'file-tray-full-outline' },
    { title: 'Gestión de Reservas', url: '/main/gestionreserva', icon: 'file-tray-full-outline' },
    { title: 'Gestión de Penalización', url: '/main/gestionpenalizacion', icon: 'file-tray-full-outline' }

  ]

  router = inject(Router);
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  curretPath: String = '';


  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event?.url) this.curretPath = event.url;
    })
  }

  singnOut() {
    this.firebaseSvc.signOut();
  }

}
