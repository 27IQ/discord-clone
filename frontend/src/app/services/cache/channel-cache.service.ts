import { Injectable } from '@angular/core';
import { GenericCache } from './base/generic-cache';
import { Channel, ChannelData } from '../../classes/channel';

@Injectable({
  providedIn: 'root',
})
export class ChannelCacheService {

  public cache

  constructor() {
    this.cache = new GenericCache<ChannelData, Channel>()
  }
}
