package com.emonitor.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "breaks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Break {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long breakId;

    private Long userId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
