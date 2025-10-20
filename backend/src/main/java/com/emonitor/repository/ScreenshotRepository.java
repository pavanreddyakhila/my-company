package com.emonitor.repository;

import com.emonitor.model.Screenshot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenshotRepository extends JpaRepository<Screenshot, Long> {
    List<Screenshot> findByUserId(Long userId);
    List<Screenshot> findBySessionId(Long sessionId);
}
