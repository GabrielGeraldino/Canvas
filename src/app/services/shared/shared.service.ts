import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  extensions = ['.jpeg', '.jpg', '.jpe', '.jfif', '.png', '.svg'];

  constructor() { }

  checkImg(ext: string) {
    ext.toLowerCase();
    if (this.extensions.includes(ext)) {
      return true;
    } else {
      return false;
    }
  }

}
