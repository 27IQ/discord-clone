package de.minus27IQ.discord_clone.websocket.messages.base;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import de.minus27IQ.discord_clone.websocket.messages.VoiceJoinEvent;
import de.minus27IQ.discord_clone.websocket.messages.VoiceLeaveEvent;

@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, include = JsonTypeInfo.As.PROPERTY, property = "type")
@JsonSubTypes({
        // @JsonSubTypes.Type(value = ChatMessage.class, name = "MESSAGE"),
        // @JsonSubTypes.Type(value = TypingEvent.class, name = "TYPING"),
        @JsonSubTypes.Type(value = VoiceJoinEvent.class, name = "VOICE_JOIN"),
        @JsonSubTypes.Type(value = VoiceLeaveEvent.class, name = "VOICE_LEAVE")
})
public interface BaseEnvelope {
    MessageType getType();
}
