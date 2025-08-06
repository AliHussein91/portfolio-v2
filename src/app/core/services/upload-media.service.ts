import { inject, Injectable } from '@angular/core';
import { END_Points } from '../http/global/global.config';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


interface UploadResponse {
  fileUrl: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})


export class UploadMediaService {

  uploadMediaURL = END_Points.upload
  http: HttpClient = inject(HttpClient)

  postImage(image: File): Observable<UploadResponse> {
    // Client-side validation for file size
    if (image.size > 4 * 1024 * 1024) {
      // Return an observable that emits an error
      return throwError(() => new Error('Image size must be less than 4MB.'));
    }

    // Client-side validation for file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(image.type)) {
      // Return an observable that emits an error
      return throwError(() => new Error('Invalid image type. Only JPEG, PNG, WEBP, or SVG are allowed.'));
    }

    // Create a FormData object to send the file
    const formData = new FormData();
    // The key 'image' MUST match the field name expected by multer on the server
    formData.append('image', image, image.name);

    // When posting FormData, Angular automatically sets the correct
    // 'multipart/form-data' header. Do not set it manually.
    return this.http.post<UploadResponse>(this.uploadMediaURL.postUpload, formData);
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
