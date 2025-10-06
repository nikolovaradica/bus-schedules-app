package mk.ukim.finki.bus_schedules_app.model.mapper;

import mk.ukim.finki.bus_schedules_app.model.BusSchedule;
import mk.ukim.finki.bus_schedules_app.model.dto.BusScheduleDto;

public class BusScheduleMapper {
    public static BusScheduleDto toDto(BusSchedule schedule) {
        return new BusScheduleDto(
                schedule.getId(),
                schedule.getCityFrom().getName(),
                schedule.getCityTo().getName(),
                schedule.getCompany().getName(),
                schedule.getDepartureTime(),
                schedule.getDaysAvailable()
        );
    }
}
