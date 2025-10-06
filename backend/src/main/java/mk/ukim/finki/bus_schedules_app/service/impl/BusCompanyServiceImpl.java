package mk.ukim.finki.bus_schedules_app.service.impl;

import mk.ukim.finki.bus_schedules_app.model.dto.BusCompanyDto;
import mk.ukim.finki.bus_schedules_app.repository.BusCompanyRepository;
import mk.ukim.finki.bus_schedules_app.service.BusCompanyService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusCompanyServiceImpl implements BusCompanyService {
    private final BusCompanyRepository busCompanyRepository;

    public BusCompanyServiceImpl(BusCompanyRepository busCompanyRepository) {
        this.busCompanyRepository = busCompanyRepository;
    }

    @Override
    public List<BusCompanyDto> getAllCompanies() {
        return busCompanyRepository.findAllByOrderByNameAsc().stream()
                .map(busCompany -> new BusCompanyDto(busCompany.getId(), busCompany.getName(),
                        busCompany.getContactEmail(), busCompany.getContactPhoneNumber(), busCompany.getWebPage()))
                .toList();
    }
}
