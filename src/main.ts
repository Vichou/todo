import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function setupMocks() {
  const { injectMocks, extractScenarioFromLocation } = await import(
    'data-mocks'
  );
  const { scenarios } = await import('src/app/mocks');

  injectMocks(scenarios, extractScenarioFromLocation(window.location));
}

async function main() {
  if (environment.production) {
    enableProdMode();
  }
  
  if (!environment.production) {
    await setupMocks();
  }
  
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));  
}

main();