package com.btl.btl.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.btl.btl.models.Book;
import com.btl.btl.repositories.BookRepository;

@Service
public class BookService {
	private String imagePath = "../react/btl/public/images";
	@Autowired
	private BookRepository bookRepositories;
	
	public BookService(BookRepository bookRepositories) {
		this.bookRepositories = bookRepositories;
	}
	
	public Book getBookById(int id) {
		return bookRepositories.findById(id).get();
	}
	
	public List<Book> getAllBooks() {
		return bookRepositories.findAll();
	}
	
	public void addBook(Book book) {
		bookRepositories.save(book);
	}
	
	public void editBook(int id, Book book) {
		Book exitingBook = bookRepositories.findById(id).get();
		exitingBook.setTitle(book.getTitle());
		exitingBook.setAuthor(book.getAuthor());
		exitingBook.setPages(book.getPages());
		exitingBook.setCategory(book.getCategory());
		exitingBook.setDate(book.getDate());
		exitingBook.setImage(book.getImage());
		exitingBook.setDescription(book.getDescription());
		bookRepositories.save(exitingBook);
	}
	public void deleteBook(int id) {
		Book exitingBook = bookRepositories.findById(id).get();
		bookRepositories.delete(exitingBook);
	}
	public List<Book> search(String str) {
		List<Book> books = bookRepositories.search(str);
		return books;
	}
	public void fileUpload(String fileName, MultipartFile image) throws IOException {
        byte[] bytes = image.getBytes();      
        File directory = new File(imagePath);
        Path path = Paths.get(directory.getPath()+"/"+fileName);
        if (!directory.exists()) {
            directory.mkdir();
        }
        try {
        	Files.write(path, bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }
     
	}
}
