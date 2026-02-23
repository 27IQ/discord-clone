import { ApplicationConfig, inject, provideEnvironmentInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ChannelCacheService } from './services/cache/channel-cache.service';
import { GuildCacheService } from './services/cache/guild-cache.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideEnvironmentInitializer(() => {
      inject(ChannelCacheService);
      inject(GuildCacheService);
    })]
};
