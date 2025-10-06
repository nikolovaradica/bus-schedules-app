package mk.ukim.finki.bus_schedules_app.service.impl;

import mk.ukim.finki.bus_schedules_app.model.dto.CityDto;
import mk.ukim.finki.bus_schedules_app.repository.CityRepository;
import mk.ukim.finki.bus_schedules_app.service.CityService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    private final CityRepository cityRepository;

    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<CityDto> getAllCities() {
        return cityRepository.findAllByOrderByNameAsc().stream()
                .map(city -> new CityDto(city.getId(), city.getName()))
                .toList();
    }
}
