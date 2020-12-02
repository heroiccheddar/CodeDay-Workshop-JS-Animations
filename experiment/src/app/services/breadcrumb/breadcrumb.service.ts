import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  selectedColor: string;

  selectedShape: string;

  selectedSize: number = 1;
}
