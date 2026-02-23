package de.minus27IQ.discord_clone.channels;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import de.minus27IQ.discord_clone.channels.dto.ChannelIdResponse;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(ChannelIdResponse.fromChannels(channelService.getChannelsOfUser()));
    }
}
