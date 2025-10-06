package mk.ukim.finki.bus_schedules_app.model.dto;

import java.time.LocalTime;

public record BusScheduleDto(Long id,
                             String cityFrom,
                             String cityTo,
                             String company,
                             LocalTime departureTime,
                             String daysAvailable) {
}
