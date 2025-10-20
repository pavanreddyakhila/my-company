package com.emonitor.service;

import com.emonitor.model.LoginSession;
import com.emonitor.model.Activity;
import com.emonitor.model.Screenshot;
import com.emonitor.repository.SessionRepository;
import com.emonitor.repository.ScreenshotRepository;
import com.emonitor.repository.UserRepository;
import com.emonitor.repository.ActivityRepository;
import com.emonitor.exception.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MonitorService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private ScreenshotRepository screenshotRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityRepository activityRepository;

    public LoginSession startSession(Long userId) {
        LoginSession session = new LoginSession();
        session.setUserId(userId);
        session.setStartTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    public LoginSession endSession(Long sessionId) {
        LoginSession session = sessionRepository.findById(sessionId)
                .orElseThrow(() -> new BadRequestException("Session not found"));
        session.setEndTime(LocalDateTime.now());
        return sessionRepository.save(session);
    }

    public List<LoginSession> getSessions(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    public Activity logActivity(Long userId, String activityType) {
        Activity activity = new Activity();
        activity.setUserId(userId);
        activity.setActivityType(activityType);
        activity.setTimestamp(LocalDateTime.now());
        return activityRepository.save(activity);
    }

    public Screenshot saveScreenshot(Screenshot screenshot) {
        if(screenshot == null) throw new BadRequestException("Screenshot data is required");
        return screenshotRepository.save(screenshot);
    }
}
