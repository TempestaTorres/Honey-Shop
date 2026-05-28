import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { videoData, VideoDataType } from '../data/video-data';

@Injectable({
  providedIn: 'root',
})
export class VideoDataService {

  public getTopHomeVideoData(): Observable<VideoDataType[]> {

    return new Observable<VideoDataType[]>(observer => {
      observer.next(videoData);
    });
  }
}
