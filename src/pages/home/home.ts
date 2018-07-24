import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datos;
  constructor(public navCtrl: NavController, private fb: Facebook, public toastCtrl: ToastController) {}

  loginFacebook(){
    this.fb.login(['public_profile', 'email'])
    .then((res: FacebookLoginResponse) => {
      if(res.status == 'connected'){
        this.createToast(res.status);
        this.account();
        console.log(JSON.stringify(res));
      }
    })
    .catch(e => {this.createToast('No connected');})
  }
  account(){
    this.fb.api('/me/accounts', ['manage_pages', 'publish_pages'])
    .then(res => {
      this.datos = res.data;
      // console.log(JSON.stringify(res));
    })
    .catch(e => {console.error("fallo publish ", e);})
  }
  createToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    })
    toast.present();
  }
  logout(){
    this.fb.logout()
    .then(result =>{this.createToast("Adios")})
  }

}
