import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeviceDetectionService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isMobile(): boolean {
    return isPlatformBrowser(this.platformId) && (window.innerWidth < 768);
  }
}
