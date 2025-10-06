import {ButtonGroup, Form, ToggleButton} from "react-bootstrap";
import {WEEKDAYS_SHORT} from '../utils/constants.ts';

type DaySelectorProps = {
    selectedDays: string[];
    setSelectedDays: (value) => void;
    runsOnHolidays: boolean;
    setRunsOnHolidays: (value) => void;
};

const DaySelector = ({
                         selectedDays,
                         setSelectedDays,
                         runsOnHolidays,
                         setRunsOnHolidays
                     }: DaySelectorProps) => {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Денови во кои е достапна</Form.Label>
            <div className="d-flex flex-wrap gap-2 mb-2">
                <ButtonGroup>
                    <>{WEEKDAYS_SHORT.map((day) => (
                        <ToggleButton
                            key={day}
                            id={`day-${day}`}
                            type="checkbox"
                            variant="outline-secondary"
                            value={day}
                            checked={selectedDays.includes(day)}
                            onChange={(e) => {
                                const value = e.currentTarget.value;
                                setSelectedDays((prev) =>
                                    prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
                                );
                            }}
                            className="text-nowrap rounded-pill px-3 py-1 me-1"
                        >
                            {day}
                        </ToggleButton>
                    ))}</>
                </ButtonGroup>
            </div>

            <ToggleButton
                type="checkbox"
                id="holiday"
                variant={runsOnHolidays ? "secondary" : "outline-secondary"}
                checked={runsOnHolidays}
                onChange={() => setRunsOnHolidays((prev) => !prev)}
                className="text-nowrap rounded-pill px-3 py-1"
                value={""}
            >
                Празници
            </ToggleButton>
        </Form.Group>
    );
};

export default DaySelector;