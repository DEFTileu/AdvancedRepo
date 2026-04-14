package com.travel.service;

import com.travel.domain.Car;
import com.travel.repo.BookingRepository;
import com.travel.repo.CarRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BookingServiceConcurrencyTest {

    @Autowired BookingService service;
    @Autowired CarRepository carRepo;
    @Autowired BookingRepository bookingRepo;

    @Test
    void only_one_of_ten_concurrent_books_for_same_window_succeeds() throws InterruptedException {
        Car car = carRepo.save(Car.builder()
                .brand("Test").model("X").year(2024).pricePerHour(1000)
                .latitude(0).longitude(0).city("Almaty")
                .available(true).fuelType("PETROL").seats(4).rating(4.5)
                .build());

        LocalDateTime start = LocalDateTime.now().plusDays(1);
        LocalDateTime end   = start.plusHours(3);

        int threads = 10;
        CountDownLatch ready = new CountDownLatch(threads);
        CountDownLatch go = new CountDownLatch(1);
        AtomicInteger ok = new AtomicInteger();
        AtomicInteger conflict = new AtomicInteger();
        ExecutorService pool = Executors.newFixedThreadPool(threads);

        for (int i = 0; i < threads; i++) {
            pool.submit(() -> {
                ready.countDown();
                try {
                    go.await();
                    service.bookCar(1L, car.getId(), start, end);
                    ok.incrementAndGet();
                } catch (BookingConflictException e) {
                    conflict.incrementAndGet();
                } catch (Exception ignored) {
                }
            });
        }

        ready.await();
        go.countDown();
        pool.shutdown();
        pool.awaitTermination(15, TimeUnit.SECONDS);

        assertThat(ok.get()).isEqualTo(1);
        assertThat(conflict.get()).isEqualTo(threads - 1);
    }
}
