package com.travel.repo;

import com.travel.domain.Booking;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findAllByOrderByCreatedAtDesc();
    List<Booking> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Booking b " +
           "WHERE b.carId = :carId " +
           "AND b.endAt > :start AND b.startAt < :end")
    List<Booking> findOverlappingForCar(@Param("carId") Long carId,
                                        @Param("start") LocalDateTime start,
                                        @Param("end") LocalDateTime end);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT b FROM Booking b " +
           "WHERE b.apartmentId = :apartmentId " +
           "AND b.endAt > :start AND b.startAt < :end")
    List<Booking> findOverlappingForApartment(@Param("apartmentId") Long apartmentId,
                                              @Param("start") LocalDateTime start,
                                              @Param("end") LocalDateTime end);
}
