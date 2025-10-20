package com.emonitor.service;

import com.emonitor.model.Break;
import com.emonitor.repository.BreakRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class BreakService {

    @Autowired
    private BreakRepository breakRepository;

    public Break startBreak(Long userId) {
        Break br = new Break();
        br.setUserId(userId);
        br.setStartTime(LocalDateTime.now());
        return breakRepository.save(br);
    }

    public Break endBreak(Long breakId) {
        Break br = breakRepository.findById(breakId).orElseThrow();
        br.setEndTime(LocalDateTime.now());
        return breakRepository.save(br);
    }

    public List<Break> getUserBreaks(Long userId) {
        return breakRepository.findByUserId(userId);
    }
}
