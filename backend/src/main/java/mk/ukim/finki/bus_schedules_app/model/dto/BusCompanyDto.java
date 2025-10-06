package mk.ukim.finki.bus_schedules_app.model.dto;

public record BusCompanyDto(Long id,
                            String name,
                            String contactEmail,
                            String contactPhoneNumber,
                            String webPage) {
}
