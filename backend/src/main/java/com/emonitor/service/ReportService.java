package com.emonitor.service;

import com.emonitor.model.LoginSession;
import com.emonitor.model.Break;
import com.emonitor.repository.SessionRepository;
import com.emonitor.repository.BreakRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;

@Service
public class ReportService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private BreakRepository breakRepository;

    public long getTotalWorkedHours(Long userId) {
        List<LoginSession> sessions = sessionRepository.findByUserId(userId);
        long totalMinutes = 0;
        for(LoginSession s : sessions){
            if(s.getEndTime() != null) {
                totalMinutes += Duration.between(s.getStartTime(), s.getEndTime()).toMinutes();
            }
        }
        return totalMinutes;
    }

    public long getTotalBreakHours(Long userId) {
        List<Break> breaks = breakRepository.findByUserId(userId);
        long totalMinutes = 0;
        for(Break b : breaks){
            if(b.getEndTime() != null) {
                totalMinutes += Duration.between(b.getStartTime(), b.getEndTime()).toMinutes();
            }
        }
        return totalMinutes;
    }
}
