package mk.ukim.finki.bus_schedules_app.service;

import mk.ukim.finki.bus_schedules_app.model.dto.CityDto;

import java.util.List;

public interface CityService {
    List<CityDto> getAllCities();
}
