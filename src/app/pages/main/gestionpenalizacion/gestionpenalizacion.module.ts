import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GestionpenalizacionPageRoutingModule } from './gestionpenalizacion-routing.module';

import { GestionpenalizacionPage } from './gestionpenalizacion.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GestionpenalizacionPageRoutingModule,
    SharedModule
  ],
  declarations: [GestionpenalizacionPage]
})
export class GestionpenalizacionPageModule {}
