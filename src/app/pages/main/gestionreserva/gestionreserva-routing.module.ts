import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionreservaPage } from './gestionreserva.page';

const routes: Routes = [
  {
    path: '',
    component: GestionreservaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionreservaPageRoutingModule {}
