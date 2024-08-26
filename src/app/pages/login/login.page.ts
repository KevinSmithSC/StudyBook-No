import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { User } from 'src/app/model/user.model';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formsb = new FormGroup({

    emailsb: new FormControl('', [Validators.required, Validators.email]),
    clavesb: new FormControl('', [Validators.required])

  })

  firebaseSvcsb = inject(FirebaseService);
  utilsSvcsb = inject(UtilsService)

  ngOnInit() {
  }

  async submitsb() {
    if (this.formsb.valid) {

      const loading = await this.utilsSvcsb.loadingsb();
      await loading.present();


      this.firebaseSvcsb.sigInsb(this.formsb.value as User).then(res => {

        this.getUserInfosb(res.user.uid);

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

        loading.dismiss();

      })
    }

  }

  async getUserInfosb(uid: string) {
    if (this.formsb.valid) {

      const loadingsb = await this.utilsSvcsb.loadingsb();
      await loadingsb.present();

      let path = `users/${uid}`;

      this.firebaseSvcsb.getDocumentsb(path).then((user: User) => {

        this.utilsSvcsb.saveInLocalStoragesb('user', user);
        this.utilsSvcsb.routerLinksb('/main/home');
        this.formsb.reset();

        // BANNER
        this.utilsSvcsb.presentToastsb({
          message: `Te damos la bienvenida`,
          duration: 1500,
          color: 'primary',
          position: 'bottom',
        })

      }).catch(error => {
        console.log(error);

        this.utilsSvcsb.presentToastsb({
          message: error.message,
          duration: 2000,
          color: 'primary',
          position: 'bottom',
          icon: 'alert-circle-outline'
        })

      }).finally(() => {
        loadingsb.dismiss();
      })
    }
  }

}
