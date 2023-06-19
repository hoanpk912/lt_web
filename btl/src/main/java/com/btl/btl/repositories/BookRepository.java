package com.btl.btl.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.btl.btl.models.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
	@Query("SELECT b FROM Book b WHERE CONCAT(b.title, b.pages) LIKE %?1%")
	public List<Book> search(String keyword);
}
