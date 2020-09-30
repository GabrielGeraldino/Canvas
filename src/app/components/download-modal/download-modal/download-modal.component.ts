import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss'],
})
export class DownloadModalComponent implements OnInit {

  instagram = true;
  facebook = true;
  twitter = true;
  youtube = true;

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() { }

  async dismissDownload() {
    await this.modalCtrl.dismiss({
      ok: true,
      instagram: this.instagram,
      facebook: this.facebook,
      twitter: this.twitter,
      youtube: this.youtube
    });
  }

  async close() {
    await this.modalCtrl.dismiss({ ok: false });
  }

}
