package mk.ukim.finki.bus_schedules_app.service.impl;

import mk.ukim.finki.bus_schedules_app.model.mapper.BusScheduleMapper;
import mk.ukim.finki.bus_schedules_app.model.BusCompany;
import mk.ukim.finki.bus_schedules_app.model.BusSchedule;
import mk.ukim.finki.bus_schedules_app.model.City;
import mk.ukim.finki.bus_schedules_app.model.dto.BusScheduleDto;
import mk.ukim.finki.bus_schedules_app.model.exceptions.BusCompanyNotFoundException;
import mk.ukim.finki.bus_schedules_app.model.exceptions.BusScheduleNotFoundException;
import mk.ukim.finki.bus_schedules_app.model.exceptions.CityNotFoundException;
import mk.ukim.finki.bus_schedules_app.repository.BusCompanyRepository;
import mk.ukim.finki.bus_schedules_app.repository.BusScheduleRepository;
import mk.ukim.finki.bus_schedules_app.repository.CityRepository;
import mk.ukim.finki.bus_schedules_app.service.BusScheduleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class BusScheduleServiceImpl implements BusScheduleService {
    private final BusScheduleRepository busScheduleRepository;
    private final CityRepository cityRepository;
    private final BusCompanyRepository busCompanyRepository;

    public BusScheduleServiceImpl(BusScheduleRepository busScheduleRepository,
                                  CityRepository cityRepository,
                                  BusCompanyRepository busCompanyRepository) {
        this.busScheduleRepository = busScheduleRepository;
        this.cityRepository = cityRepository;
        this.busCompanyRepository = busCompanyRepository;
    }

    @Override
    public Page<BusScheduleDto> getAllSchedules(Pageable pageable) {
        return busScheduleRepository.findAll(pageable)
                .map(BusScheduleMapper::toDto);
    }

    @Override
    public Page<BusScheduleDto> searchSchedules(String cityFromName,
                                                String cityToName,
                                                String companyName,
                                                LocalDate departureDate,
                                                Pageable pageable) {
        BusCompany company = null;
        City cityFrom = null;
        City cityTo = null;

        if (companyName != null && !companyName.isBlank()) {
            company = busCompanyRepository.findByNameIgnoreCase(companyName)
                    .orElseThrow(() -> new BusCompanyNotFoundException("Company not found: " + companyName));
        }
        if (cityFromName != null && !cityFromName.isBlank()) {
            cityFrom = cityRepository.findByNameIgnoreCase(cityFromName)
                    .orElseThrow(() -> new CityNotFoundException("City from not found: " + cityFromName));
        }
        if (cityToName != null && !cityToName.isBlank()) {
            cityTo = cityRepository.findByNameIgnoreCase(cityToName)
                    .orElseThrow(() -> new CityNotFoundException("City to not found: " + cityToName));
        }

        Page<BusSchedule> schedules = busScheduleRepository.findByFilters(company, cityFrom, cityTo, pageable);

        if (departureDate != null) {
            List<BusScheduleDto> filtered = schedules.stream()
                    .filter(schedule -> isScheduleAvailableOn(schedule, departureDate))
                    .map(BusScheduleMapper::toDto)
                    .toList();

            return new PageImpl<>(filtered, pageable, filtered.size());
        }

        return schedules.map(BusScheduleMapper::toDto);
    }

    @Override
    public BusScheduleDto createSchedule(BusScheduleDto dto) {
        City cityFrom = cityRepository.findByNameIgnoreCase(dto.cityFrom())
                .orElseThrow(() -> new CityNotFoundException("City from not found: " + dto.cityFrom()));
        City cityTo = cityRepository.findByNameIgnoreCase(dto.cityTo())
                .orElseThrow(() -> new CityNotFoundException("City to not found: " + dto.cityTo()));
        BusCompany company = busCompanyRepository.findByNameIgnoreCase(dto.company())
                .orElseThrow(() -> new BusCompanyNotFoundException("Company not found: " + dto.company()));

        BusSchedule schedule = BusSchedule.builder()
                .cityFrom(cityFrom)
                .cityTo(cityTo)
                .company(company)
                .departureTime(dto.departureTime())
                .daysAvailable(dto.daysAvailable())
                .build();
        return BusScheduleMapper.toDto(busScheduleRepository.save(schedule));
    }

    @Override
    public BusScheduleDto updateSchedule(Long id, BusScheduleDto dto) {
        BusSchedule schedule = busScheduleRepository.findById(id)
                .orElseThrow(() -> new BusScheduleNotFoundException("Schedule not found with id: " + id));

        City cityFrom = cityRepository.findByNameIgnoreCase(dto.cityFrom())
                .orElseThrow(() -> new CityNotFoundException("City from not found: " + dto.cityFrom()));
        City cityTo = cityRepository.findByNameIgnoreCase(dto.cityTo())
                .orElseThrow(() -> new CityNotFoundException("City to not found: " + dto.cityTo()));
        BusCompany company = busCompanyRepository.findByNameIgnoreCase(dto.company())
                .orElseThrow(() -> new BusCompanyNotFoundException("Company not found: " + dto.company()));

        schedule.setCityFrom(cityFrom);
        schedule.setCityTo(cityTo);
        schedule.setCompany(company);
        schedule.setDepartureTime(dto.departureTime());
        schedule.setDaysAvailable(dto.daysAvailable());
        return BusScheduleMapper.toDto(busScheduleRepository.save(schedule));
    }

    @Override
    public void deleteSchedule(Long id) {
        if (!busScheduleRepository.existsById(id)) {
            throw new BusScheduleNotFoundException("Schedule with id: " + id + "not found");
        }
        busScheduleRepository.deleteById(id);
    }

    private boolean isScheduleAvailableOn(BusSchedule schedule, LocalDate date) {
        String daysAvailable = schedule.getDaysAvailable().toLowerCase();
        DayOfWeek dayOfWeek = date.getDayOfWeek();

        String dayNameMk = switch (dayOfWeek) {
            case MONDAY -> "понеделник";
            case TUESDAY -> "вторник";
            case WEDNESDAY -> "среда";
            case THURSDAY -> "четврток";
            case FRIDAY -> "петок";
            case SATURDAY -> "сабота";
            case SUNDAY -> "недела";
        };

        if (daysAvailable.contains("секој ден")) {
            if (daysAvailable.contains("освен")) {
                return !daysAvailable.contains(dayNameMk);
            }
            return true;
        } else if (daysAvailable.contains("само")) {
            return daysAvailable.contains(dayNameMk);
        }

        return false;
    }
}
