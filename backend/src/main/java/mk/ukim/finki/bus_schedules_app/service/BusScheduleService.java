package mk.ukim.finki.bus_schedules_app.service;

import mk.ukim.finki.bus_schedules_app.model.dto.BusScheduleDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface BusScheduleService {
    Page<BusScheduleDto> getAllSchedules(Pageable pageable);
    Page<BusScheduleDto> searchSchedules(String fromCityName, String toCityName, String companyName,
                                         LocalDate departureDate, Pageable pageable);

    BusScheduleDto createSchedule(BusScheduleDto dto);
    BusScheduleDto updateSchedule(Long id, BusScheduleDto dto);
    void deleteSchedule(Long id);
}
