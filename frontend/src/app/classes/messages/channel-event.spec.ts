import { ChannelEvent } from './channel-event';
import { Crud } from './crud';
import { MessageType } from './message-type';

describe('ChannelEvent', () => {
  it('should create an instance', () => {
    expect(new ChannelEvent(MessageType.CHANNEL, Crud.CREATE)).toBeTruthy();
  });
});
