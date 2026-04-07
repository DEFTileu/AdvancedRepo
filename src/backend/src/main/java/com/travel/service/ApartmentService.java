package com.travel.service;

import com.travel.domain.Apartment;
import com.travel.repo.ApartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApartmentService {

    private final ApartmentRepository repo;

    public List<Apartment> all() {
        return repo.findAll();
    }

    public List<Apartment> available() {
        return repo.findByAvailableTrue();
    }

    public Apartment byId(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Apartment not found: " + id));
    }

    @Transactional
    public Apartment save(Apartment apartment) {
        return repo.save(apartment);
    }

    @Transactional
    public void delete(Long id) {
        if (!repo.existsById(id)) {
            throw new IllegalArgumentException("Apartment not found: " + id);
        }
        repo.deleteById(id);
    }
}
