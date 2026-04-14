import {EnvironmentProviders, Provider, provideZonelessChangeDetection} from '@angular/core';
import {provideHttpClient} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

const testProviders: EnvironmentProviders | Provider  = [
  provideHttpClient(), provideHttpClientTesting(), provideZonelessChangeDetection()
];
export default testProviders;