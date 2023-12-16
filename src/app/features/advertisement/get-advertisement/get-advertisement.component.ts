import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Advertisement } from '../models/advertisement.model';

@Component({
  selector: 'app-get-advertisement',
  templateUrl: './get-advertisement.component.html',
  styleUrls: ['./get-advertisement.component.css']
})
export class GetAdvertisementComponent {
  advertisements$?: Observable<Advertisement[]>;
  blobUrls: string[] = [];
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    var queryParams = new HttpParams();
    queryParams = queryParams.append("pageInfo.number", 1);
    queryParams = queryParams.append("pageInfo.size", 5);
    this.advertisements$ = this.http.get<Advertisement[]>('http://localhost:5001/api/Advertisement/advertisements', { params: queryParams })
      .pipe(
        map((response: any) => {
          // Convert byte[] to Blob for each Advertisement in the response
          return response.map((ad: any) => {
            const blob = this.convertByteArrayToBlob(ad.file);
            const blobUrl = URL.createObjectURL(blob);
            this.blobUrls.push(blobUrl);
            // Return the modified Advertisement object with Blob
            return {
              id: ad.id,
              title: ad.title,
              type: ad.type,
              file: blobUrl
            } as any;
          });
        })
      );
    this.advertisements$.subscribe({
    next: (result: any) => this.advertisements$ = of(result),
    error: (err: HttpErrorResponse) => console.log(err)
  });
  }
  
// Function to convert byte[] to Blob
convertByteArrayToBlob(byteArray: any): Blob {
  const arrayBuffer = this.base64ToArrayBuffer(byteArray);
  return new Blob([arrayBuffer], { type: 'application/octet-stream' }); // Change the type if you know the specific file type
}

// Function to convert base64 to ArrayBuffer
base64ToArrayBuffer(base64: any): ArrayBuffer {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
ngOnDestroy(): void {
  // Revoke all Blob URLs when the component is destroyed
  this.blobUrls.forEach(url => URL.revokeObjectURL(url));
}
}
