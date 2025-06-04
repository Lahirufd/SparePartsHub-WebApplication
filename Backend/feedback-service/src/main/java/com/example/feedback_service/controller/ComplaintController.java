package com.example.feedback_service.controller;

import com.example.feedback_service.entity.Complaint;
import com.example.feedback_service.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/complaints")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4000"})
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping
    public Complaint submitComplaint(@RequestBody Complaint complaint) {
        return complaintService.submitComplaint(complaint);
    }

    @GetMapping("/user/{userId}")
    public List<Complaint> getComplaintsByUser(@PathVariable Long userId) {
        return complaintService.getComplaintsByUser(userId);
    }

    @PatchMapping("/{id}")
    public Complaint updateComplaintStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return complaintService.updateComplaintStatus(id, status);
    }

    @GetMapping
    public List<Complaint> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @DeleteMapping("/{id}")
    public void deleteComplaint(@PathVariable Long id) {
        complaintService.deleteComplaint(id);
    }
}

