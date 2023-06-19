package com.btl.btl.controllers;

import java.io.IOException;
import java.sql.Date;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.btl.btl.models.Book;
import com.btl.btl.services.BookService;


@RestController
@CrossOrigin
public class BookController {
	@Autowired
	private BookService bookService;
	
	@GetMapping("/books")
	public List<Book> getAllBooks(){
		List<Book> books = bookService.getAllBooks();
		return books;
	}
	
	@GetMapping("/book/{id}")
	public Book getBookById(@PathVariable int id) {
		Book book = bookService.getBookById(id);
		return book;
	}
	
	@PostMapping("/addBook")
	public void addBook(Book book) {
		bookService.addBook(book);
	}
	
	@PutMapping("/book/save/{id}")
	public void editBook(@RequestParam("title") String title, @RequestParam("author") String author,
			@RequestParam("description") String description, @RequestParam("date") Date date,
			@RequestParam("pages") int pages, @RequestParam("category") String category,
			@RequestParam(value = "file") MultipartFile image,
			@PathVariable int id) throws IOException {
		Book book = new Book();
		book.setTitle(title);
		book.setAuthor(author);
		book.setDescription(description);
		book.setDate(date);
		book.setPages(pages);
		book.setCategory(category);
	
		String fileName = image.getOriginalFilename();
        book.setImage(fileName);
        System.out.println(book.getImage());
        bookService.fileUpload(fileName, image);

		bookService.editBook(id, book);
	}
	
	@DeleteMapping("/book/delete/{id}")
	public String deleteBook(@PathVariable int id) {
		try {
			bookService.deleteBook(id);
			System.out.println("ok");
			return "ok";
		}catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
		
	}
	@GetMapping("/search")
	public  List<Book> searchBook(@RequestParam("query") String key) {
		List<Book> books = bookService.search(key);
		return books;
	}
}
