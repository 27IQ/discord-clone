package de.minus27IQ.discord_clone.guilds;

import static de.minus27IQ.discord_clone.users.UserUtilityHelper.getUserByAuth;

import java.util.UUID;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import de.minus27IQ.discord_clone.guilds.dto.GuildResponse;
import de.minus27IQ.discord_clone.websocket.messages.GuildEvent;
import de.minus27IQ.discord_clone.websocket.messages.base.BaseEnvelope;
import de.minus27IQ.discord_clone.websocket.messages.base.Crud;
import de.minus27IQ.discord_clone.websocket.messages.base.MessageType;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping
@RequiredArgsConstructor
public class GuildWsController {

    private final GuildService guildService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/guild")
    public void handle(@Payload BaseEnvelope baseEnvelope, Authentication auth) {
        switch (baseEnvelope) {
            case GuildEvent guildEvent:
                handleGuildEvent(guildEvent, auth);
                break;

            default:
                break;
        }
    }

    private void handleGuildEvent(GuildEvent guildEvent, Authentication auth) {
        switch (guildEvent.crud()) {
            case READ:
                sendGuildUpdateTo(getUserByAuth(auth).getUsername(), guildEvent.guildId());
                break;

            default:
                break;
        }
    }

    private void broadcastGuildUpdate(UUID guildId) {
        var guildOp = guildService.getGuildById(guildId);

        guildOp.ifPresentOrElse((guild) -> {
            messagingTemplate.convertAndSend("/topic/guild." + guild.getId(),
                    new GuildEvent(MessageType.GUILD, Crud.UPDATE, guild.getId(), new GuildResponse(guild)));
        }, () -> {
            throw new GuildException("Guild not found");
        });
    }

    private void sendGuildUpdateTo(String username, UUID guildId) {
        var guildOp = guildService.getGuildById(guildId);

        guildOp.ifPresentOrElse((guild) -> {
            messagingTemplate.convertAndSendToUser(username,
                    "/topic/guild." + guild.getId(),
                    new GuildEvent(MessageType.GUILD, Crud.UPDATE, guild.getId(), new GuildResponse(guild)));
        }, () -> {
            throw new GuildException("Guild not found");
        });
    }
}
