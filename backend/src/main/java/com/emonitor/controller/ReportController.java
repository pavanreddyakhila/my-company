package com.emonitor.controller;

import com.emonitor.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @GetMapping("/summary")
    public String getSummary(@RequestParam Long userId){
        long workedMinutes = reportService.getTotalWorkedHours(userId);
        long breakMinutes = reportService.getTotalBreakHours(userId);
        return "Worked: "+workedMinutes+" mins, Break: "+breakMinutes+" mins";
    }
}
