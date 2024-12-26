import { inject, Injectable } from '@angular/core';
import { END_Points } from '../http/global/global.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadMediaService {

  uploadMediaURL = END_Points.upload
  http: HttpClient = inject(HttpClient)

  postImage(image: File) {
    // accept only images below 4MB and of types jpeg, jpg, png, webp
    if (image.size > 4 * 1024 * 1024) {
      throw new Error('Image size must be less than 4MB')
    }
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(image.type)) {
      throw new Error('Invalid image type. Only jpeg, jpg, png, webp are allowed')
    }
    const formData = new FormData()
    formData.append('image', image)
    return this.http.post(this.uploadMediaURL.postUpload, formData)
  }

  getImages() {
    return this.http.get(this.uploadMediaURL.getUploads)
  }

  markImageInUse(fileName: string) {
    return this.http.put(this.uploadMediaURL.markInUse(fileName), {})
  }

  markImageNotInUse(fileName: string) {
    return this.http.put(this.uploadMediaURL.markNotInUse(fileName), {})
  }

}
