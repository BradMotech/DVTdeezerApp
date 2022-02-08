import { CustomHeaderComponent } from 'src/app/Components/custom-header/custom-header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaylistPageRoutingModule } from './playlist-routing.module';

import { PlaylistPage } from './playlist.page';
import { PlaylistCompComponent } from 'src/app/Components/playlist-comp/playlist-comp.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, PlaylistPageRoutingModule],
  declarations: [PlaylistPage, CustomHeaderComponent, PlaylistCompComponent],
})
export class PlaylistPageModule {}
