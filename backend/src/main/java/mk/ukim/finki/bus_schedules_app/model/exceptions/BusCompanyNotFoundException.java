package mk.ukim.finki.bus_schedules_app.model.exceptions;

public class BusCompanyNotFoundException extends RuntimeException {
    public BusCompanyNotFoundException(String message) {
        super(message);
    }
}