package com.example.feedback_service.service;

import com.example.feedback_service.entity.Feedback;
import com.example.feedback_service.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback submitFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getFeedbackByProduct(Long productId) {
        return feedbackRepository.findByProductId(productId);
    }

    public Optional<Feedback> getFeedbackById(Long id) {
        return feedbackRepository.findById(id);
    }

    public Feedback updateFeedback(Long id, Feedback updatedFeedback) {
        return feedbackRepository.findById(id).map(fb -> {
            fb.setComment(updatedFeedback.getComment());
            fb.setRating(updatedFeedback.getRating());
            return feedbackRepository.save(fb);
        }).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id);
    }
}
