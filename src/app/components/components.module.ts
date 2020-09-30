import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DownloadModalComponent } from './download-modal/download-modal/download-modal.component';

@NgModule({
    declarations: [
        DownloadModalComponent
    ],
    entryComponents: [
        DownloadModalComponent
    ],
    imports: [IonicModule.forRoot(), CommonModule],
    exports: [
        DownloadModalComponent
    ]
})

export class ComponentsModule { }
