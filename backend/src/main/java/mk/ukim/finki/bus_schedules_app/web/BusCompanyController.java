package mk.ukim.finki.bus_schedules_app.web;

import mk.ukim.finki.bus_schedules_app.model.dto.BusCompanyDto;
import mk.ukim.finki.bus_schedules_app.service.BusCompanyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
public class BusCompanyController {
    private final BusCompanyService busCompanyService;

    public BusCompanyController(BusCompanyService busCompanyService) {
        this.busCompanyService = busCompanyService;
    }

    @GetMapping
    public ResponseEntity<List<BusCompanyDto>> getAllCompanies() {
        return ResponseEntity.ok(busCompanyService.getAllCompanies());
    }
}
