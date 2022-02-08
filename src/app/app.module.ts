import { DeezerCallsService } from 'src/app/Services/deezer-calls.service';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SecondsToTimePipe } from './Components/playlist-comp/seconds-to-time.pipe';
import { PlaylistCompComponent } from './Components/playlist-comp/playlist-comp.component';


@NgModule({
  declarations: [AppComponent, SecondsToTimePipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ScrollingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    DeezerCallsService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
