import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionpenalizacionPage } from './gestionpenalizacion.page';

const routes: Routes = [
  {
    path: '',
    component: GestionpenalizacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionpenalizacionPageRoutingModule {}
