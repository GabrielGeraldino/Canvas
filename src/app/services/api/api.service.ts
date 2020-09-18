import { Injectable, Inject } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { APP_CONFIG_TOKEN, ApplicationConfig } from 'src/app/app.config';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string;

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json; charset=utf-8')
    .set('Accept', 'application/json');

  constructor(
    public http: HttpClient,
    @Inject(APP_CONFIG_TOKEN) private applicationConfig: ApplicationConfig
  ) {
    this.apiUrl = applicationConfig.apiUrl;
  }

  get() {
    return this.http.get(this.apiUrl);
    // .pipe(
    //     map((images: any[]) => images.map(i => new Image(i))),
    //     shareReplay(1)
    //   );
  }
}
