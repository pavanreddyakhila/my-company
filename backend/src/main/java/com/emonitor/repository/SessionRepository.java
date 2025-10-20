package com.emonitor.repository;

import com.emonitor.model.LoginSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends JpaRepository<LoginSession, Long> {
    List<LoginSession> findByUserId(Long userId);
}
