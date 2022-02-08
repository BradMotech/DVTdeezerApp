import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Playlist,
  Track,
  Artist,
  Album,
} from 'src/app/Services/MusicClass.class';
import { Subscription } from 'rxjs';
import { DeezerCallsService } from 'src/app/Services/deezer-calls.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.page.html',
  styleUrls: ['./playlist.page.scss'],
})
export class PlaylistPage implements OnInit {
  private params$: Subscription;
  private playlist$: Subscription;
  private tracks$: Subscription;
  /**
   * Playlist id
   */
  public id: string;
  /**
   * Current playlist
   */
  public playlist: Playlist;
  /**
   * list of tracks
   */
  public tracks: Track[];
  /**
   * Total count
   */
  public totalCount: number;
  /**
   * item size
   */
  public itemSize: number = 100;
  /**
   * Height for the virtual scroll
   */
  public scrollHeight: number = 500;
  /**
   * Number of rows
   */
  public rows: number = 20;
  /**
   * Current page
   */
  public page: number = 0;
  /**
   * Dependencies
   * @param { ActivatedRoute } route
   * @param { DeezerCallsService } deezerSvc
   */

  constructor(
    private route: ActivatedRoute,
    private deezerSvc: DeezerCallsService,
    private router: Router
  ) {}
  /**
   * OnInit
   */
  ngOnInit() {
    this.params$ = this.route.params.subscribe(
      (params) => (this.id = params.id ? params.id : null)
    );

    console.warn(this.params$);
    this.playlist$ = this.deezerSvc
      .getPlaylist(this.id)
      .subscribe((playlist) => (this.playlist = playlist));
    this.getData(0, this.rows);
  }

  /**
   * Get Data
   * @param { number } index
   * @param { number } rows
   */
  private getData(index: number, rows: number): void {
    this.tracks$ = this.deezerSvc
      .getTracks(this.id, index, rows)
      .subscribe((res) => {
        const data: Track[] = res.data;
        if (!this.tracks && index === 0) {
          this.totalCount = res.total;
          this.tracks = Array.from({ length: this.totalCount });
        }
        const arr = [...this.tracks];
        for (let i = index, j = 0; i < index + rows; i++, j++) {
          if (i >= this.totalCount) {
            break;
          }
          arr[i] = data[j];
        }
        this.tracks = arr;
      });
  }
  /**
   * Event on scroll
   * @param { number } index
   */
  public onScrollIndexChange(index: number) {
    const currentPage: number = Math.floor(index / this.rows);
    if (currentPage !== this.page) {
      this.page = currentPage;
      const currentIdx: number = this.page * this.rows;
      this.getData(currentIdx, this.rows);
    }
  }
  /**
   * OnDestroy
   */
  ngOnDestroy() {
    this.params$.unsubscribe();
    this.playlist$.unsubscribe();
    this.tracks$.unsubscribe();
  }

  headback() {
    this.router.navigate(['/tabs/tab1']);
  }
}
