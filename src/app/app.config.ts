import { InjectionToken } from '@angular/core';

export interface ApplicationConfig {
    apiUrl: string;
}

export const APP_CONFIG: ApplicationConfig = {

    apiUrl: 'https://jacto.com/api/v1/publicfiles?type=press',


};

export const APP_CONFIG_TOKEN = new InjectionToken<ApplicationConfig>('config');
