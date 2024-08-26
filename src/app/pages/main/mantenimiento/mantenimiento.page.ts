import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilsService } from 'src/app/services/utils.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.page.html',
  styleUrls: ['./mantenimiento.page.scss'],
})
export class MantenimientoPage implements OnDestroy {
  formsb: FormGroup;
  numberssb: number[] = [];
  utilsSvcsb = inject(UtilsService);
  availableOptionssb = ['Disponible', 'Ocupado'];
  salaSubscriptionsb: Subscription;
  isResettingsb = false; // Indicador de restablecimiento

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService) {
    this.formsb = this.formBuilder.group({
      encargado: ['', Validators.required],
      idsala: ['', [Validators.required, Validators.min(1), Validators.max(11)]],
      computadora: ['', [Validators.required, Validators.min(0), Validators.max(1)]],
      pizarra: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      mesa: ['', [Validators.required, Validators.min(0), Validators.max(3)]],
      sillas: ['', [Validators.required, Validators.min(0), Validators.max(6)]],
      plumon: ['', [Validators.required, Validators.min(0), Validators.max(5)]],
      mota: ['', [Validators.required, Validators.min(0), Validators.max(3)]],
      detalle: ['', Validators.required],
    });

    for (let i = 1; i <= 11; i++) {
      this.numberssb.push(i);
    }

    // Escuchar cambios en el campo idsala
    this.formsb.get('idsala').valueChanges.subscribe((value) => {
      if (value && !this.isResettingsb) { // Solo cargar datos si no estamos restableciendo
        console.log(`Cambio detectado en idsala: ${value}`);
        this.loadSalaDatasb(value.toString());
      }
    });
  }

  loadSalaDatasb(idsala: string) {
    // Cancelar la suscripción anterior si existe
    if (this.salaSubscriptionsb) {
      this.salaSubscriptionsb.unsubscribe();
    }

    // Obtener los datos de la sala desde Firestore y actualizar el formulario
    this.salaSubscriptionsb = this.firebaseService.getSalaByIdsb(idsala).subscribe(data => {
      if (data) {
        console.log(`Datos de sala cargados: `, data);
        this.formsb.patchValue(data);
      }
    });
  }

  async submitsb() {
    if (this.formsb.valid) {
      const idsala = this.formsb.value.idsala.toString();

      // Elimina idsala del objeto updatedData
      const { idsala: _, ...updatedData } = this.formsb.value;

      try {
        // Desactivar la suscripción antes de actualizar
        if (this.salaSubscriptionsb) {
          this.salaSubscriptionsb.unsubscribe();
        }

        await this.firebaseService.updateDocumentsb('mantenimiento', idsala, updatedData);
        console.log('Datos actualizados exitosamente en Firestore');
        this.resetFormsb(); // Restablece el formulario después de actualizar
      } catch (error) {
        console.error('Error al actualizar los datos en Firestore:', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }

  resetFormsb() {
    console.log('Restableciendo el formulario...');
    this.isResettingsb = true; // Indicador de restablecimiento

    this.formsb.reset(); // Restablece el estado del formulario
    this.formsb.markAsPristine(); // Marca el formulario como no modificado
    this.formsb.markAsUntouched(); // Marca el formulario como no tocado

    // Inicializa algún valor por defecto después de resetear
    this.formsb.setValue({
      encargado: '',
      idsala: '',
      computadora: '',
      pizarra: '',
      mesa: '',
      sillas: '',
      plumon: '',
      mota: '',
      detalle: ''
    });

    console.log('Formulario restablecido:', this.formsb.value);
    this.isResettingsb = false; // Restablecimiento completado
  }

  ngOnDestroy() {
    if (this.salaSubscriptionsb) {
      this.salaSubscriptionsb.unsubscribe();
    }
  }
}