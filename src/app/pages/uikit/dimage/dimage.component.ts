import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DimageService } from '../../service/dimage.service';
import { ImageModule } from 'primeng/image';

@Component({
    selector: 'app-dimage',
    standalone: true,
    imports: [ImageModule],
    templateUrl: './dimage.component.html',
    styleUrl: './dimage.component.css',
    providers: []
})
export class DimageComponent  implements OnInit {
    imageUrl: SafeUrl | null = null;

  constructor(
    private sanitizer: DomSanitizer,
    private dimageService: DimageService
  ) {}

    ngOnInit(): void {
     this.dimageService.getImageBlob('logo-customer.jpeg').subscribe((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
    });
    }

    
}
