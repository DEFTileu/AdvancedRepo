package com.travel.repo;

import com.travel.domain.Apartment;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ApartmentRepository extends JpaRepository<Apartment, Long> {
    List<Apartment> findByAvailableTrue();

    List<Apartment> findByCityIgnoreCase(String city);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT a FROM Apartment a WHERE a.id = :id")
    Optional<Apartment> findByIdForUpdate(@Param("id") Long id);
}
