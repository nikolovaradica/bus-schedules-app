package mk.ukim.finki.bus_schedules_app.model.exceptions;

public class BusScheduleNotFoundException extends RuntimeException {
    public BusScheduleNotFoundException(String message) {
        super(message);
    }
}