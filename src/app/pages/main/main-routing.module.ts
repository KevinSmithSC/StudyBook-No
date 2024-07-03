import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [{
      path: 'home',
      loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
      path: 'gestion',
      loadChildren: () => import('../main/gestion/gestion.module').then(m => m.GestionPageModule)
    },
    {
      path: 'reportes',
      loadChildren: () => import('../main/reportes/reportes.module').then(m => m.ReportesPageModule)
    },
    {
      path: 'mantenimiento',
      loadChildren: () => import('../main/mantenimiento/mantenimiento.module').then(m => m.MantenimientoPageModule)
    },
    {
      path: 'gestionreserva',
      loadChildren: () => import('./gestionreserva/gestionreserva.module').then( m => m.GestionreservaPageModule)
    },
    {
      path: 'gestionpenalizacion',
      loadChildren: () => import('./gestionpenalizacion/gestionpenalizacion.module').then( m => m.GestionpenalizacionPageModule)
    }
    ]
  },
  



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
