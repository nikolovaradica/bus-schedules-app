package mk.ukim.finki.bus_schedules_app.repository;

import mk.ukim.finki.bus_schedules_app.model.BusCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BusCompanyRepository extends JpaRepository<BusCompany, Long> {
    Optional<BusCompany> findByNameIgnoreCase(String name);
    List<BusCompany> findAllByOrderByNameAsc();
}
