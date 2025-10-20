package com.emonitor.controller;

import com.emonitor.model.Break;
import com.emonitor.service.BreakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/breaks")
public class BreakController {

    @Autowired
    private BreakService breakService;

    @PostMapping("/start")
    public Break startBreak(@RequestParam Long userId){
        return breakService.startBreak(userId);
    }

    @PostMapping("/end")
    public Break endBreak(@RequestParam Long breakId){
        return breakService.endBreak(breakId);
    }

    @GetMapping("/user/{userId}")
    public List<Break> getUserBreaks(@PathVariable Long userId){
        return breakService.getUserBreaks(userId);
    }
}
