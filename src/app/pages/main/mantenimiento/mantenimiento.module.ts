import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule aquí

import { MantenimientoPageRoutingModule } from './mantenimiento-routing.module';
import { MantenimientoPage } from './mantenimiento.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    MantenimientoPageRoutingModule,
    SharedModule
  ],
  declarations: [MantenimientoPage]
})
export class MantenimientoPageModule {}
