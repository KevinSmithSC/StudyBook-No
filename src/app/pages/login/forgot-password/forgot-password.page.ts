
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import {User} from 'src/app/model/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  formsb = new FormGroup({

    emailsb: new FormControl('', [Validators.required, Validators.email]),
    
  })

firebaseSvcsb = inject (FirebaseService);
utilsSvcsb= inject(UtilsService)

  ngOnInit() {
  }

  async submitsb(){
    if (this.formsb.valid){
      
      const loadingsb = await this.utilsSvcsb.loadingsb();
      await loadingsb.present();



      this.firebaseSvcsb.sendRecoveryEmailsb(this.formsb.value.emailsb).then(res => {

        this.utilsSvcsb.presentToastsb({
          message: "Correo enviado correctamente",
          duration: 1500,
          color: "primary",
          position: "bottom",
          icon: "mail-outline"
        })

        this.utilsSvcsb.routerLinksb('/login');
        this.formsb.reset();

      }).catch(error => {

        console.log(error);

        this.utilsSvcsb.presentToastsb({
          message: "Correo o contraseña incorrecta",
          duration: 2500,
          color: "primary",
          position: "bottom",
          icon: "alert-circle-outline"
        })

      }).finally(() => {

        loadingsb.dismiss();

      })
    }

}

}


