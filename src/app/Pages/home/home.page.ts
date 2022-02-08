import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Artist, Playlist } from '../../Services/MusicClass.class';
import { Observable } from 'rxjs';
import { DeezerCallsService } from 'src/app/Services/deezer-calls.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  SearchInput: string;
  Artists: Artist[] = new Array();
  /**
   * list of playlist
   * @type { Observable<Playlist[]> }
   */
  public playlists$: Observable<Playlist[]>;
  /**
 /**
   * Dependencies
   * @param { Router } router
   * @param { DeezerCallsService } deezerSvc
   */

  constructor(private router: Router, private deezerSvc: DeezerCallsService) {}

  ngOnInit() {
    this.initialArtists(2, 12);
  }
  /**
   * goPlaylist()
   *
   * Go to the playlist
   * @param { string } id playlist id
   */
  public goPlaylist(id: number) {
    this.router.navigate(['tabs/tab1/Playlist', id]);
  }

  SearchPlaylist(): void {
    this.Artists = new Array();
    if (this.SearchInput === '' || this.SearchInput === ' ') {
      this.initialArtists(2, 12);
    } else {
      this.deezerSvc.searchArtist(this.SearchInput).subscribe((res) => {
        res.data.forEach((artistReturn) => {
          this.Artists.push(artistReturn);
        });
      });
    }
  }

  initialArtists(lLimit: number, uLimit: number): void {
    this.Artists = new Array();
    this.deezerSvc.getArtists(lLimit, uLimit).subscribe((artist_x) => {
      const artists_list = artist_x;
      artists_list.forEach((artist_each) => {
        if (!('error' in artist_each)) {
          this.Artists.push(artist_each);
        }
      });
    });
  }
}
