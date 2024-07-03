import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);


  constructor(private router: Router) { }

  ngOnInit() {
  }


  irAReportes() {
    this.router.navigate(['./reportes']);
  }
  irAMantenimiento() {
    this.router.navigate(['./mantenimiento']);
  }
  irAGestion() {
    this.router.navigate(['./gestion']);
  }
  irALaboratorio() {
    this.router.navigate(['./mantenimiento']);
  }

  // Cerrar sesion
  signOut() {
    this.firebaseSvc.signOut();
  }
}
