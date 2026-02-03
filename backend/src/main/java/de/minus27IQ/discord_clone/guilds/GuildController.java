package de.minus27IQ.discord_clone.guilds;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import de.minus27IQ.discord_clone.guilds.dto.GuildRespone;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api/guilds")
public class GuildController {

    private final GuildService guildService;

    @PostMapping("/create/{name}")
    public ResponseEntity<?> createGuild(@PathVariable String name) throws URISyntaxException {
        var guildId = guildService.createGuild(name);
        // TODO make uri dynamic (not localhost)
        return ResponseEntity.created(new URI("http://localhost:8080/api/guilds/guild/" + guildId)).build();
    }

    @GetMapping("/guild/{guildId}")
    public ResponseEntity<?> getGuildById(@PathVariable UUID guildId) throws GuildNotFoundException {
        var guild = guildService.getGuildById(guildId);
        return ResponseEntity.ok(new GuildRespone(guild));
    }

    @GetMapping("/myguilds")
    public ResponseEntity<?> getGuildsForCurrentUser() {
        var guilds = guildService.getGuildsForCurrentUser();
        return ResponseEntity.ok(GuildRespone.fromGuilds(guilds));
    }

}
