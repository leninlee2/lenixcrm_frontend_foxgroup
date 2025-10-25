import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'  // Ensures ApiService is available globally
})
export class DimageService {
    

    constructor(private http: HttpClient) {}

    getImageBlob(imageName: string) {
        var url = `http://localhost:4202/${imageName}`;
        console.log(url);
        return this.http.get(url, {
        responseType: 'blob',
        });
    }
    

}