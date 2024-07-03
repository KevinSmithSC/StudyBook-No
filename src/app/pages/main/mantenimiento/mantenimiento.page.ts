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
  form: FormGroup;
  numbers: number[] = [];
  utilsSvc = inject(UtilsService);
  availableOptions = ['Disponible', 'Ocupado'];
  salaSubscription: Subscription;
  isResetting = false; // Indicador de restablecimiento

  constructor(private formBuilder: FormBuilder, private firebaseService: FirebaseService) {
    this.form = this.formBuilder.group({
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
      this.numbers.push(i);
    }

    // Escuchar cambios en el campo idsala
    this.form.get('idsala').valueChanges.subscribe((value) => {
      if (value && !this.isResetting) { // Solo cargar datos si no estamos restableciendo
        console.log(`Cambio detectado en idsala: ${value}`);
        this.loadSalaData(value.toString());
      }
    });
  }

  loadSalaData(idsala: string) {
    // Cancelar la suscripción anterior si existe
    if (this.salaSubscription) {
      this.salaSubscription.unsubscribe();
    }

    // Obtener los datos de la sala desde Firestore y actualizar el formulario
    this.salaSubscription = this.firebaseService.getSalaById(idsala).subscribe(data => {
      if (data) {
        console.log(`Datos de sala cargados: `, data);
        this.form.patchValue(data);
      }
    });
  }

  async submit() {
    if (this.form.valid) {
      const idsala = this.form.value.idsala.toString();

      // Elimina idsala del objeto updatedData
      const { idsala: _, ...updatedData } = this.form.value;

      try {
        // Desactivar la suscripción antes de actualizar
        if (this.salaSubscription) {
          this.salaSubscription.unsubscribe();
        }

        await this.firebaseService.updateDocument('mantenimiento', idsala, updatedData);
        console.log('Datos actualizados exitosamente en Firestore');
        this.resetForm(); // Restablece el formulario después de actualizar
      } catch (error) {
        console.error('Error al actualizar los datos en Firestore:', error);
      }
    } else {
      console.error('Formulario no válido');
    }
  }

  resetForm() {
    console.log('Restableciendo el formulario...');
    this.isResetting = true; // Indicador de restablecimiento

    this.form.reset(); // Restablece el estado del formulario
    this.form.markAsPristine(); // Marca el formulario como no modificado
    this.form.markAsUntouched(); // Marca el formulario como no tocado

    // Inicializa algún valor por defecto después de resetear
    this.form.setValue({
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

    console.log('Formulario restablecido:', this.form.value);
    this.isResetting = false; // Restablecimiento completado
  }

  ngOnDestroy() {
    if (this.salaSubscription) {
      this.salaSubscription.unsubscribe();
    }
  }
}