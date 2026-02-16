package de.minus27IQ.discord_clone.channels;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.UUID;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import de.minus27IQ.discord_clone.channels.dto.ChannelResponse;
import de.minus27IQ.discord_clone.channels.exceptions.ChannelException;
import de.minus27IQ.discord_clone.websocket.messages.ChannelEvent;
import de.minus27IQ.discord_clone.websocket.messages.VoiceEvent;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.Crud;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping
@RequiredArgsConstructor
public class ChannelWsController {

    private final ChannelService channelService;
    private final ChannelStateService channelStateService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/channel")
    public void handle(@Payload BaseEnvelope baseEnvelope, Authentication auth) {
        switch (baseEnvelope) {
            case ChannelEvent channelEvent:
                handleChannelEvent(channelEvent, auth);
                break;

            case VoiceEvent voiceEvent:
                handleVoiceEvent(voiceEvent, auth);
                break;

            default:
                break;
        }
    }

    private void handleChannelEvent(ChannelEvent channelEvent, Authentication auth) {
        switch (channelEvent.crud()) {
            case READ:
                sendChannelUpdateTo(getUserByAuth(auth).getUsername(), channelEvent.channelId());
                break;

            default:
                break;
        }
    }

    private void handleVoiceEvent(VoiceEvent voiceEvent, Authentication auth) {
        switch (voiceEvent.status()) {
            case START:
                channelStateService.add(voiceEvent.channelId(), getUserByAuth(auth).getId());
                broadcastChannelUpdate(voiceEvent.channelId());
                break;

            case END:
                channelStateService.removeElement(voiceEvent.channelId(), getUserByAuth(auth).getId());
                broadcastChannelUpdate(voiceEvent.channelId());
                break;

            default:
                break;
        }
    }

    private void broadcastChannelUpdate(UUID channelId) {
        var channelOp = channelService.getChannelById(channelId);

        channelOp.ifPresentOrElse((channel) -> {
            messagingTemplate.convertAndSend("/topic/channel." + channel.getId(),
                    new ChannelEvent(MessageType.CHANNEL, Crud.UPDATE, channel.getId(),
                            new ChannelResponse(channel, channelStateService.getSnapshotAndConvert(channelId))));
        }, () -> {
            throw new ChannelException("Channel not found");
        });
    }

    private void sendChannelUpdateTo(String username, UUID channelId) {
        var channelOp = channelService.getChannelById(channelId);

        channelOp.ifPresentOrElse((channel) -> {
            messagingTemplate.convertAndSendToUser(username,
                    "/topic/channel." + channel.getId(),
                    new ChannelEvent(MessageType.CHANNEL, Crud.UPDATE, channel.getId(),
                            new ChannelResponse(channel, channelStateService.getSnapshotAndConvert(channelId))));
        }, () -> {
            throw new ChannelException("Channel not found");
        });
    }
}
