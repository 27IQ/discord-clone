package de.minus27IQ.discord_clone.channels.state;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import de.minus27IQ.discord_clone.users.User;
import de.minus27IQ.discord_clone.websocket.messages.VoiceEvent;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;
import de.minus27IQ.discord_clone.websocket.messages.base.Status;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChannelStateController {

    private final ChannelStateService channelStateService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void handle(@Payload BaseEnvelope envelope, Authentication auth) {
        switch (envelope) {
            case VoiceEvent join:

                if (join.status() == Status.START) {
                    channelStateService.joinChannel(join.channelId(), auth);
                    var event = new VoiceEvent(MessageType.VOICE, Status.START, join.channelId(),
                            ((User) auth.getPrincipal()).getId());
                    messagingTemplate.convertAndSend("/topic/channel." + join.channelId(), event);
                } else {
                    // TODO implement leave
                }
                break;

            default:
                throw new IllegalArgumentException("Type does not fit any MessageTypes.");
        }
    }
}
