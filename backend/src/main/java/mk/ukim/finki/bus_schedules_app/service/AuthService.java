package mk.ukim.finki.bus_schedules_app.service;

import mk.ukim.finki.bus_schedules_app.model.dto.LoginRequest;
import mk.ukim.finki.bus_schedules_app.model.dto.RegisterRequest;
import mk.ukim.finki.bus_schedules_app.model.dto.AuthResponse;

public interface AuthService {
    AuthResponse register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}
