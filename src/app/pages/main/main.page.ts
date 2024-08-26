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

  pagessb = [
    { titlesb: 'Inicio', urlsb: '/main/home'},
    { titlesb: 'Reportes', urlsb: '/main/reportes'},
    { titlesb: 'Mantenimiento', urlsb: '/main/mantenimiento'},
    { titlesb: 'Gestión de salas', urlsb: '/main/gestion'},
    { titlesb: 'Gestión de Reservas', urlsb: '/main/gestionreserva'},
    { titlesb: 'Gestión de Penalización', urlsb: '/main/gestionpenalizacion'}

  ]

  routersb = inject(Router);
  firebaseSvcsb = inject(FirebaseService);
  utilsSvcsb = inject(UtilsService);
  curretPathsb: String = '';


  ngOnInit() {
    this.routersb.events.subscribe((event: any) => {
      if (event?.url) this.curretPathsb = event.url;
    })
  }

  singnOutsb() {
    this.firebaseSvcsb.signOutsb();
  }

}
