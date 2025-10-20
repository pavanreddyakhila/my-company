package com.emonitor.controller;

import com.emonitor.model.LoginSession;
import com.emonitor.model.Screenshot;
import com.emonitor.service.MonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/monitor")
public class MonitorController {

    @Autowired
    private MonitorService monitorService;

    @Value("${screenshots.path}")
    private String screenshotPath;

    @PostMapping("/start-session")
    public LoginSession startSession(@RequestParam Long userId) {
        return monitorService.startSession(userId);
    }

    @PostMapping("/end-session")
    public LoginSession endSession(@RequestParam Long sessionId) {
        return monitorService.endSession(sessionId);
    }

    @PostMapping("/screenshot")
    public Screenshot uploadScreenshot(@RequestParam Long userId,
                                       @RequestParam Long sessionId,
                                       @RequestParam MultipartFile file) throws IOException {
        File folder = new File(screenshotPath);
        if(!folder.exists()) folder.mkdirs();

        String filename = "screenshot_" + System.currentTimeMillis() + ".png";
        File dest = new File(folder, filename);
        file.transferTo(dest);

        Screenshot screenshot = new Screenshot();
        screenshot.setUserId(userId);
        screenshot.setSessionId(sessionId);
        screenshot.setFilePath(dest.getAbsolutePath());
        screenshot.setCapturedAt(LocalDateTime.now());

        return monitorService.saveScreenshot(screenshot);
    }

    @GetMapping("/sessions")
    public List<LoginSession> getSessions(@RequestParam Long userId) {
        return monitorService.getSessions(userId);
    }
}
