package de.minus27IQ.discord_clone.websocket;

import java.sql.Date;
import java.text.SimpleDateFormat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class GreetingController {

    @MessageMapping("/greeting")
    public String handle(String greeting) {
        return "[" + getTimestamp() + ": " + greeting;
    }

    private String getTimestamp() {
        return new SimpleDateFormat("MM/dd/yyyy h:mm:ss a").format(new Date(System.currentTimeMillis()));
    }

}
