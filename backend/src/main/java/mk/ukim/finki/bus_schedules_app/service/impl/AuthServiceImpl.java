package mk.ukim.finki.bus_schedules_app.service.impl;

import mk.ukim.finki.bus_schedules_app.model.BusCompany;
import mk.ukim.finki.bus_schedules_app.model.User;
import mk.ukim.finki.bus_schedules_app.model.dto.LoginRequest;
import mk.ukim.finki.bus_schedules_app.model.dto.RegisterRequest;
import mk.ukim.finki.bus_schedules_app.model.dto.AuthResponse;
import mk.ukim.finki.bus_schedules_app.model.exceptions.EmailAlreadyInUseException;
import mk.ukim.finki.bus_schedules_app.model.exceptions.InvalidCredentialsException;
import mk.ukim.finki.bus_schedules_app.repository.BusCompanyRepository;
import mk.ukim.finki.bus_schedules_app.repository.UserRepository;
import mk.ukim.finki.bus_schedules_app.service.AuthService;
import mk.ukim.finki.bus_schedules_app.web.jwt.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.Normalizer;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final BusCompanyRepository busCompanyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository, BusCompanyRepository busCompanyRepository, PasswordEncoder passwordEncoder, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.busCompanyRepository = busCompanyRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    private String normalize(String input) {
        if (input == null) return "";
        if (input.contains("@"))
            input = input.substring(0, input.length() - 3);
        return Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{M}", "")
                .replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "")
                .toLowerCase();
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if(userRepository.existsByEmail(request.email())) {
            throw new EmailAlreadyInUseException("Email already in use");
        }

        String normalizedEmail = normalize(request.email());
        String normalizedName = normalize(request.name());

        BusCompany company = busCompanyRepository.findAll().stream()
                .filter(c -> {
                    String normalizedCompanyEmail = normalize(c.getContactEmail());
                    return c.getNormalizedName().contains(normalizedName) ||
                            normalizedCompanyEmail.contains(normalizedName) ||
                            normalizedCompanyEmail.contains(normalizedEmail) ||
                            normalizedEmail.contains(c.getNormalizedName());
                })
                .findFirst()
                .orElse(null);

        User user = User.builder()
                .email(request.email())
                .name(request.name())
                .password(passwordEncoder.encode(request.password()))
                .company(company)
                .build();

        User savedUser = userRepository.save(user);
        String token = jwtUtils.generateToken(
                savedUser.getEmail(),
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getCompany() != null ? savedUser.getCompany().getName() : null
        );

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getName(),
                savedUser.getCompany() != null ? savedUser.getCompany().getName() : null);
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(InvalidCredentialsException::new);

        if(!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getId(), user.getEmail(), user.getName(), user.getCompany().getName());
        return new AuthResponse(token,user.getId(), user.getEmail(), user.getName(), user.getCompany() != null ? user.getCompany().getName() : null);
    }
}
