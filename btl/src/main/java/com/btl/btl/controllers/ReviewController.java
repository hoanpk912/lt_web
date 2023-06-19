package com.btl.btl.controllers;

import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.btl.btl.models.Book;
import com.btl.btl.models.Review;
import com.btl.btl.repositories.ReviewRepository;
import com.btl.btl.services.BookService;
import com.btl.btl.services.ReviewService;

@RestController
@CrossOrigin
public class ReviewController {
	@Autowired
	private ReviewService reviewService;
	
	@Autowired
	private BookService bookService; 
	
	@GetMapping("/review/{id}")
	public List<Review> getReviewsOfBook(@PathVariable int id) {
		List<Review> reviews = reviewService.getListRivews(bookService.getBookById(id));
		return reviews;
	}
	@PostMapping("/review/add/{id}")
	public void addReview(@PathVariable int id, @RequestParam("user") int user_id, @RequestParam("star") int star,
			@RequestParam("comment")String comment ) {
		reviewService.addReview( user_id, id, star, comment);
	}
	@GetMapping("/rate/{id}")
	public Integer getRateOfBook(@PathVariable int id) {
		int res = reviewService.getAvgStar(id);
		return res;
	}
	
}
