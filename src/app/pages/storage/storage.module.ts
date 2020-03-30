import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoragePageRoutingModule } from './storage-routing.module';

import { StoragePage } from './storage.page';

import 'gl-ionic-background-video';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoragePageRoutingModule
  ],
  declarations: [StoragePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoragePageModule {}
