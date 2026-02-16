import { ChannelEvent } from './channel-event';
import { Crud } from './base/crud';
import { MessageType } from './base/message-type';

describe('ChannelEvent', () => {
  it('should create an instance', () => {
    expect(new ChannelEvent(MessageType.CHANNEL, Crud.CREATE)).toBeTruthy();
  });
});
