package com.emonitor.repository;

import com.emonitor.model.Break;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BreakRepository extends JpaRepository<Break, Long> {
    List<Break> findByUserId(Long userId);
}
