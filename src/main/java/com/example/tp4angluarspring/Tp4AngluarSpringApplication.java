import com.example.tp4angluarspring.entities.Payment;
import com.example.tp4angluarspring.entities.PaymentType;
import com.example.tp4angluarspring.entities.Student;
import com.example.tp4angluarspring.repository.PaymentRepository;
import com.example.tp4angluarspring.repository.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Random;
import java.util.UUID;

@SpringBootApplication
public class Tp4AngluarSpringApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDemoAngularApplication.class, args);
    }
    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository,
                                        PaymentRepository paymentRepository){
        return args -> {
            // This method serves as a callback function that will be executed when the Spring Boot application starts
            // It implements the CommandLineRunner interface, allowing it to accept command-line arguments
            // The method body contains the logic that should be executed when the application starts

            // Save Students to the database
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Mohammed").code("112233").programId("SDIA")
                    .build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Amine").code("112244").programId("SDIA")
                    .build());
            studentRepository.save(Student.builder().id(UUID.randomUUID().toString())
                    .firstName("Youssef").code("112255").programId("BDCC")
                    .build());

            // Add Payment to a Student and Save it to the database
            PaymentType[] paymentTypes = PaymentType.values();
            Random random = new Random();
            studentRepository.findAll().forEach(st->{
                for (int i = 0; i < 10; i++) {
                    int index = random.nextInt(paymentTypes.length);
                    Object PaymentStatus;
                    Payment payment = Payment.builder()
                            
                            .amount(1000+(int)(Math.random()*20000))
                            .type(paymentTypes[index])
                            .status(PaymentStatus.CREATED)
                            .date(LocalDate.now())
                            .student(st)
                            .build();
                    paymentRepository.save(payment);
                }
            });
        };
    }
}
 