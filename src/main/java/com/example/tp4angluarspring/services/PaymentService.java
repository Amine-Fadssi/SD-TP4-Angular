package com.example.tp4angluarspring.services;

import com.example.springdemoangular.dtos.NewPaymentDTO;
import com.example.springdemoangular.entities.Payment;
import com.example.springdemoangular.entities.PaymentStatus;
import com.example.springdemoangular.entities.PaymentType;
import com.example.springdemoangular.entities.Student;
import com.example.springdemoangular.repository.PaymentRepository;
import com.example.springdemoangular.repository.StudentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.UUID;

@Service
@Transactional
public class PaymentService {
    private StudentRepository studentRepository;
    private PaymentRepository paymentRepository;

    public PaymentService(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        this.studentRepository = studentRepository;
        this.paymentRepository = paymentRepository;
    }
    public Payment savePayment(MultipartFile file, NewPaymentDTO newPaymentDTO) throws IOException {

        // Define the folder path where uploaded files will be stored
        Path folderPath = Paths.get(System.getProperty("user.home"),"enset-data","payments");
        // Create the folder if it doesn't exist
        if(!Files.exists(folderPath)){
            Files.createDirectories(folderPath);
        }

        // Generate a unique file name using UUID
        String fileName = UUID.randomUUID().toString();
        Path filePath = Paths.get(System.getProperty("user.home"),"enset-data","payments", fileName+".pdf");
        // Save the uploaded file to the specified file path
        Files.copy(file.getInputStream(), filePath);

        Student student = studentRepository.findByCode(newPaymentDTO.getStudentCode());
        Payment payment = Payment.builder().date(
                newPaymentDTO.getDate())
                .type(newPaymentDTO.getType())
                .amount(newPaymentDTO.getAmount())
                .file(filePath.toUri().toString())
                .student(student)
                .status(PaymentStatus.CREATED)
                .build();
        // Save the new Payment object to the database and return it
        return paymentRepository.save(payment);
    }
    public Payment updatePaymentStatus(PaymentStatus status, Long id){
        Payment payment = paymentRepository.findById(id).get();
        payment.setStatus(status);
        // Save the updated payment object back to the database
        // and return the updated payment with the new status
        return paymentRepository.save(payment);
    }
    public byte[] getPaymentFile(Long paymentId) throws IOException {
        Payment payment = paymentRepository.findById(paymentId).get();
        // Read the content of the payment file as bytes
        return Files.readAllBytes(Path.of(URI.create(payment.getFile())));
    }
}
