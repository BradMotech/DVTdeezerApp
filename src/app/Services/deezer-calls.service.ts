import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, range } from 'rxjs';
import { environment } from '../../environments/environment';
import { map, mergeMap, toArray } from 'rxjs/operators';
// Class & Interfaces
import {
  Playlist,
  DeezerResponse,
  Track,
  Search,
  Artist,
  Tracklist,Albums
} from './MusicClass.class';
@Injectable({
  providedIn: 'root',
})
export class DeezerCallsService {
  /**
   * userURL
   * @type { string }
   */
  private userURL: string = `${environment.api}/user`;
  private DeezerURL: string = `${environment.api}artist`;
  /**
   * playlistURL
   * @type { string }
   */
  private playlistURL: string = `${environment.api}/playlist`;
  /**
   * Inject HttpClient
   * @param { HttpClient } http
   */
  constructor(private http: HttpClient) {}
  /**
   * getAllPlaylist
   * @param { string } id
   * @return { Observable<Playlist[]> } A observable playlist list
   */
  public getAllPlaylist(id: string): Observable<Playlist[]> {
    return this.http
      .jsonp<DeezerResponse>(
        `${this.userURL}/${id}/playlists?output=jsonp`,
        'callback'
      )
      .pipe(map((res) => res.data.map((item) => this.mappingPlaylist(item))));
  }

  public getAllPlaylistByName(name: string): Observable<Playlist[]> {
    return this.http
      .jsonp<DeezerResponse>(`${this.DeezerURL}/${name}`, 'callback')
      .pipe(map((res) => res.data.map((item) => this.mappingPlaylist(item))));
  }
  /**
   * getPlaylist
   * @param { string } id
   * @return { Observable<Playlist> } A observable playlist
   */
  public getPlaylist(id: string): Observable<Playlist> {
    return this.http
      .jsonp<any>(`${this.playlistURL}/${id}?output=jsonp`, 'callback')
      .pipe(map((res) => this.mappingPlaylist(res)));
  }

  /**
   * getTracks
   * @param { string } id
   * @return { Observable<DeezerResponse> } Return a observable
   */
  public getTracks(
    id: string,
    index: number,
    rows: number
  ): Observable<DeezerResponse> {
    return this.http
      .jsonp<DeezerResponse>(
        `${this.playlistURL}/${id}/tracks?index=${index}&limit=${rows}&output=jsonp`,
        'callback'
      )
      .pipe(
        map((res) => {
          res.data = res.data.map(
            (item) =>
              new Track(item.id, item.title, item.artist.name, item.duration)
          );
          return res;
        })
      );
  }
  /**
   * mappingPlaylist
   * @param {*} item
   * @return { Playlist } A playlist
   */
  private mappingPlaylist(item): Playlist {
    return new Playlist(
      item.id,
      item.title,
      item.picture_big,
      item.creator,
      item.creation_date,
      item.duration
    );
  }

  getArtist(query?: number): Observable<Artist> {
    return this.http.get<Artist>(`${environment.api}${query}`);
  }

  getArtists(limit_lower: number, limit_count: number): Observable<Artist[]> {
    return range(limit_lower, limit_count).pipe(
      map((x) => this.getArtist(x)),
      mergeMap((x) => x),
      toArray()
    );
  }

  searchArtist(name: string): Observable<Search> {
    const data = this.http
      .get<Search>(`${environment.apiUrlSearch}${name}"`)
      .pipe(map((x) => x));
    return data;
  }

  getTracklist(artistId: number): Observable<Tracklist> {
    return this.http.get<Tracklist>(
      `${environment.api}${artistId}/top?limit=5`
    );
  }
  getAlbums(query?: number): Observable<Albums> {
    return this.http.get<Albums>(`${environment.api}${query}/albums`);
  }
}
