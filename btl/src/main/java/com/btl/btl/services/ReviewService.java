package com.btl.btl.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.btl.btl.models.Book;
import com.btl.btl.models.Cart;
import com.btl.btl.models.Review;
import com.btl.btl.models.User;
import com.btl.btl.repositories.BookRepository;
import com.btl.btl.repositories.CartRepositoty;
import com.btl.btl.repositories.ReviewRepository;

@Service
public class ReviewService {
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	private BookService bookService;
	
	@Autowired
	private UserService userService;
	
	public List<Review> getListRivews(Book book) {
		return reviewRepository.findByBook(book);
	}
	public void addReview(int user_id, int book_id, int star, String comment) {
		Book book = bookService.getBookById(book_id);
		User user = userService.getUserById(user_id);
		Review review = new Review();
		review.setBook(book);
		review.setUser(user);
		review.setStar(star);
		review.setComment(comment);
		reviewRepository.save(review);
	}
	public int getAvgStar(int id) {
		try {
			return reviewRepository.getAvgStar(id);
		} catch (Exception e) {
			return 0;
		}
	}
}
