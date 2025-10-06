package mk.ukim.finki.bus_schedules_app.service;

import mk.ukim.finki.bus_schedules_app.model.dto.BusCompanyDto;

import java.util.List;

public interface BusCompanyService {
    List<BusCompanyDto> getAllCompanies();
}
