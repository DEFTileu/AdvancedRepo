package com.travel.repo;

import com.travel.domain.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findAllByOrderByCreatedAtDesc();
    List<Booking> findAllByUserIdOrderByCreatedAtDesc(Long userId);
}
