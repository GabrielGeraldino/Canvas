import { Injectable } from '@angular/core';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  extensions = ['.jpeg', '.jpg', '.jpe', '.jfif', '.png', '.svg'];

  private toast = null;
  private isLoading = false;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  checkImg(ext: string) {
    ext.toLowerCase();
    if (this.extensions.includes(ext)) {
      return true;
    } else {
      return false;
    }
  }

  async showToast(message: string) {
    if (this.toast) {
      this.toast.dismiss();
      this.toast = null;
    }
    this.toast = await this.toastCtrl.create({
      message,
      buttons: [
        { role: 'cancel', text: 'OK' },
      ],
      color: 'primary',
      duration: 2500,
      position: 'bottom',
    });
    this.toast.present();
  }

  // Função que mostra um modal com um loading no meio da tela.
  async showLoading(msg?: string, interval: number = 120000) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      message: msg,
      duration: interval,
    }).then(load => {
      load.present().then(() => {
        if (!this.isLoading) {
          load.dismiss(null, undefined);
        }
      });
    });
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss(null, undefined);
  }

}
