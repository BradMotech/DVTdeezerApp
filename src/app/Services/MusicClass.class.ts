interface Author {
  id: number;
  name: string;
  tracklist: string;
  type: string;
}
export class Playlist {
  constructor(
    public id: number,
    public title: string,
    public cover: string,
    public author: Author,
    public date: string,
    public duration: number
  ) {}
}
export class Track {
  constructor(
    public id: number,
    public title: string,
    public artistName: string,
    public duration: number
  ) {}
}
export interface DeezerResponse {
  checksum: string;
  data: any[];
  total: number;
  next?: string;
  prev?: string;
}
// Album model
export class Album {
  id: number;
  title: string;
  link: string;
  cover: string;
  cover_small: string;
  cover_medium: string;
  cover_big: string;
  cover_xl: string;
  genre_id: number;
  fans: number;
  release_date: Date;
  record_type: string;
  tracklist: string;
  explicit_lyrics: boolean;
  type: string;
}
export class Albums {
  data: Album[];
  total: number;
}
export class Artist {
  id: number;
  name: string;
  link: string;
  share: string;
  picture: string;
  picture_small: string;
  picture_medium: string;
  picture_big: string;
  picture_xl: string;
  nb_album: number;
  nb_fan: number;
  radio: boolean;
  tracklist: string;
  type: string;
  cover: string;
}
export class Search {
  data: Artist[];
}

export class Tracklist {
  data: Track[];
  total: number;
  next: string;
}
