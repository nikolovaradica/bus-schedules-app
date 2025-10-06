package mk.ukim.finki.bus_schedules_app.model.dto;

public record AuthResponse(
        String token,
        Long id,
        String email,
        String name,
        String companyName) {

}