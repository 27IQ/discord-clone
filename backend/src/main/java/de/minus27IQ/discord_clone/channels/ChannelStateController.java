package de.minus27IQ.discord_clone.channels;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

import de.minus27IQ.discord_clone.users.User;
import de.minus27IQ.discord_clone.websocket.messages.VoiceJoinEvent;
import de.minus27IQ.discord_clone.websocket.messages.VoiceLeaveEvent;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ChannelStateController {

    private final ChannelStateService channelStateService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat")
    public void handle(@Payload BaseEnvelope envelope, Authentication auth) {
        switch (envelope) {
            case VoiceJoinEvent join:
                channelStateService.joinChannel(join.channelId(), auth);
                var event = new VoiceJoinEvent(MessageType.VOICE_JOIN, join.channelId(),
                        ((User) auth.getPrincipal()).getId());
                messagingTemplate.convertAndSend("/topic/channel." + join.channelId(), event);
                break;
            case @SuppressWarnings("unused") VoiceLeaveEvent leave:
                channelStateService.leaveChannel(auth);
                break;

            default:
                throw new IllegalArgumentException("Type does not fit any MessageTypes.");
        }
    }
}
