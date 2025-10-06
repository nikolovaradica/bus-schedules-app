package mk.ukim.finki.bus_schedules_app.web;

import mk.ukim.finki.bus_schedules_app.model.dto.BusScheduleDto;
import mk.ukim.finki.bus_schedules_app.service.BusScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/schedules")
public class BusScheduleController {
    private final BusScheduleService busScheduleService;

    public BusScheduleController(BusScheduleService busScheduleService) {
        this.busScheduleService = busScheduleService;
    }

    @GetMapping
    public ResponseEntity<Page<BusScheduleDto>> getAllSchedules(Pageable pageable) {
        return ResponseEntity.ok(busScheduleService.getAllSchedules(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<BusScheduleDto>> searchSchedules(@RequestParam(required = false) String cityFrom,
                                                                @RequestParam(required = false) String cityTo,
                                                                @RequestParam(required = false) String companyName,
                                                                @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate departureDate,
                                                                @RequestParam(defaultValue = "0") int page,
                                                                @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(busScheduleService.searchSchedules(
                cityFrom,
                cityTo,
                companyName,
                departureDate,
                pageable
        ));
    }

    @PostMapping
    public ResponseEntity<BusScheduleDto> createSchedule(@RequestBody BusScheduleDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(busScheduleService.createSchedule(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BusScheduleDto> updateSchedule(@PathVariable Long id, @RequestBody BusScheduleDto dto) {
        return ResponseEntity.ok(busScheduleService.updateSchedule(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long id) {
        busScheduleService.deleteSchedule(id);
        return ResponseEntity.noContent().build();
    }
}
