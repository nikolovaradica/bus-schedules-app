package mk.ukim.finki.bus_schedules_app.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    private City cityFrom;

    @ManyToOne(optional = false)
    private City cityTo;

    @ManyToOne(optional = false)
    private BusCompany company;

    @Column(nullable = false)
    private LocalTime departureTime;

    @Column(nullable = false)
    private String daysAvailable;
}
