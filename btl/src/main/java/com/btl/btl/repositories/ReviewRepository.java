package com.btl.btl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.btl.btl.models.Book;
import com.btl.btl.models.Cart;
import com.btl.btl.models.Review;
import com.btl.btl.models.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Integer> {
	public List<Review> findByBook(Book book);
	
	@Query(value = "SELECT AVG(star) FROM reviews WHERE book_id=?1", nativeQuery = true)
	public Integer getAvgStar(int book_id);
}
