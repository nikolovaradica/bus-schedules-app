package mk.ukim.finki.bus_schedules_app.repository;

import mk.ukim.finki.bus_schedules_app.model.BusCompany;
import mk.ukim.finki.bus_schedules_app.model.BusSchedule;
import mk.ukim.finki.bus_schedules_app.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BusScheduleRepository extends JpaRepository<BusSchedule, Long> {
    @Query("""
        select schedules
        from BusSchedule schedules
        where (:company is null or schedules.company = :company)
            and (:cityFrom is null or schedules.cityFrom = :cityFrom)
            and (:cityTo is null or schedules.cityTo = :cityTo)
        order by schedules.departureTime asc
    """)
    Page<BusSchedule> findByFilters(
        @Param("company") BusCompany company,
        @Param("cityFrom") City cityFrom,
        @Param("cityTo") City cityTo,
        Pageable pageable
    );
}
