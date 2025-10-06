import { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import type { BusSchedule } from "../types";
import {parseDaysAvailable} from "../utils/formatter.ts";
import { getAllCities } from "../services/cityService.ts";
import type { City } from "../types";
import CustomDropdown from "./CustomDropdown.tsx";
import TimePickerInput from "./TimePickerInput.tsx";
import DaySelector from "./DaySelector.tsx";

type ScheduleModalProps = {
    show: boolean;
    onHide: () => void;
    onSave: (data: Partial<BusSchedule> & { days: string[]; holidays: boolean }) => void;
    schedule?: BusSchedule | null;
};

export const ScheduleModal = ({ show, onHide, onSave, schedule }: ScheduleModalProps) => {
    const [cityFrom, setCityFrom] = useState("");
    const [cityTo, setCityTo] = useState("");
    const [departureTime, setDepartureTime] = useState("");
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [runsOnHolidays, setRunsOnHolidays] = useState(false);

    const [cities, setCities] = useState<City[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (schedule) {
            setCityFrom(schedule.cityFrom);
            setCityTo(schedule.cityTo);
            setDepartureTime(schedule.departureTime);
            const { days, holidays } = parseDaysAvailable(schedule.daysAvailable);
            setSelectedDays(days);
            setRunsOnHolidays(holidays); // Example
        } else {
            setCityFrom("");
            setCityTo("");
            setDepartureTime("");
            setSelectedDays([]);
            setRunsOnHolidays(false);
        }
        const fetchData = async () => {
            setError(null);
            try {
                const fetchedCities = await getAllCities();
                setCities(fetchedCities);
            } catch {
                setError("Грешка при преземање на податоците.");
            }
        };
        fetchData();
    }, [schedule]);

    const handleSave = () => {
        onSave({
            cityFrom,
            cityTo,
            departureTime,
            days: selectedDays,
            holidays: runsOnHolidays,
        });
        onHide();
        if (!schedule) {
            setCityFrom("");
            setCityTo("");
            setDepartureTime("");
            setSelectedDays([]);
            setRunsOnHolidays(false);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{schedule ? "Уреди линија" : "Додади нова линија"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <>{error ? (
                    <p className="p-4 text-danger text-center">{error}</p>
                ) : (
                    <Form>
                        <Form.Group className="mb-3">
                            <CustomDropdown
                                label="Од"
                                value={cityFrom}
                                onChange={(val) => {
                                    setCityFrom(val);
                                    if (val === cityTo) setCityTo("");
                                }}
                                options={cities}
                                placeholder="Избери град"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <CustomDropdown
                                label="До"
                                value={cityTo}
                                onChange={setCityTo}
                                options={cities}
                                placeholder="Избери град"
                                excludeOption={cityFrom}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Време на поаѓање</Form.Label>
                            <TimePickerInput
                                value={departureTime}
                                onChange={setDepartureTime}
                                placeholder="Изберете време"
                            />
                        </Form.Group>

                        <DaySelector
                            selectedDays={selectedDays}
                            setSelectedDays={setSelectedDays}
                            runsOnHolidays={runsOnHolidays}
                            setRunsOnHolidays={setRunsOnHolidays}
                        />
                    </Form>
                    )}</>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Откажи
                </Button>
                <Button variant="success" onClick={handleSave}>
                    Зачувај
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
