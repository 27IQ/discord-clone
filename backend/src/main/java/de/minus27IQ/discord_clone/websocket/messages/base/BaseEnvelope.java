package de.minus27IQ.discord_clone.websocket.messages.base;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import de.minus27IQ.discord_clone.websocket.messages.ChannelEvent;
import de.minus27IQ.discord_clone.websocket.messages.VoiceEvent;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        @JsonSubTypes.Type(value = VoiceEvent.class, name = "VOICE"),
        @JsonSubTypes.Type(value = ChannelEvent.class, name = "CHANNEL")
/*
 * @JsonSubTypes.Type(value = VoiceEvent.class, name = "STREAM")
 * 
 * @JsonSubTypes.Type(value = VoiceEvent.class, name = "MESSAGE")
 * 
 * 
 * 
 * @JsonSubTypes.Type(value = VoiceEvent.class, name = "TYPING")
 * 
 * @JsonSubTypes.Type(value = VoiceEvent.class, name = "CHANNEL_ORDER")
 * 
 * @JsonSubTypes.Type(value = VoiceEvent.class, name = "GUILD")
 */
})

public interface BaseEnvelope {
    MessageType getType();
}
