package com.example.tp4angluarspring.web;

import com.example.springdemoangular.dtos.NewPaymentDTO;
import com.example.springdemoangular.entities.Payment;
import com.example.springdemoangular.entities.PaymentStatus;
import com.example.springdemoangular.entities.PaymentType;
import com.example.springdemoangular.entities.Student;
import com.example.springdemoangular.repository.PaymentRepository;
import com.example.springdemoangular.repository.StudentRepository;
import com.example.springdemoangular.services.PaymentService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

// Annotating this class with @RestController indicates that it's a REST controller,
// which combines the @Controller and @ResponseBody annotations.
// It's responsible for handling incoming HTTP requests and returning HTTP responses,
// where the response body is automatically serialized to JSON or XML.
@RestController
@CrossOrigin("*")
public class PaymentRestController {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;
    private PaymentService paymentService;

    public PaymentRestController(StudentRepository studentRepository, PaymentRepository paymentRepository,
                                 PaymentService paymentService) {

        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
        this.paymentService = paymentService;
    }

    // This method handles HTTP GET requests to the "/payments" endpoint
    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        // Retrieve all payments from the database using the PaymentRepository
        return paymentRepository.findAll();
    }

    @GetMapping(path = "/students/{code}/payments")
    // The @PathVariable annotation indicates that this method parameter should be bound to the value of the code path variable in the request URL.
    public List<Payment> paymentsByStudent(@PathVariable String code){
        return paymentRepository.findByStudentCode(code);
    }

    @GetMapping(path = "/payments/byStatus")
    // The @RequestParam annotation indicates that this method parameter should be bound to the value of the paymentStatus request parameter.
    public List<Payment> paymentsByStatus(@RequestParam PaymentStatus paymentStatus){
        return paymentRepository.findByStatus(paymentStatus);
    }

    @GetMapping(path = "/payments/byType")
    public List<Payment> paymentsByType(@RequestParam PaymentType paymentType){
        return paymentRepository.findByType(paymentType);
    }

    @GetMapping(path = "/payments/{id}")
    public Payment getPaymentById(@PathVariable Long id){
        return paymentRepository.findById(id).get();
    }

    @GetMapping(path = "/students")
    public List<Student> allStudents(){
        return studentRepository.findAll();
    }

    @GetMapping(path = "/students/{code}")
    public Student getStudentByCode(@PathVariable String code){
        return studentRepository.findByCode(code);
    }

    @GetMapping(path = "/studentsByProgramId")
    public List<Student> getStudentsByProgramId(@RequestParam String programId){
        return studentRepository.findByProgramId(programId);
    }

    @PutMapping("payments/{id}")
    public Payment updatePaymentStatus(@RequestParam PaymentStatus status, @PathVariable Long id){
        return paymentService.updatePaymentStatus(status, id);
    }

    @PostMapping(path = "/payments", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Payment savePayment(@RequestParam("file") MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {
        return paymentService.savePayment(file, newPaymentDTO);
    }

    // It produces a PDF response
    @GetMapping(path = "/payments/{paymentId}/file", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable Long paymentId) throws IOException {
        return paymentService.getPaymentFile(paymentId);
    }
}
