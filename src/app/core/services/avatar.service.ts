import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

interface ImageFile {
  url: string;
  secure_url: string;
}
@Injectable({ providedIn: 'root' })
export class AvatarService {
  constructor(private http: HttpClient) {}
  uploadImage(file: File) {
    const payload = new FormData();
    payload.append('image', file);
    return this.http
      .post<{ data: ImageFile }>(
        environment.urlApi + '/upload/cloudinary',
        payload
      )
      .pipe(map((response) => response.data));
  }
}
