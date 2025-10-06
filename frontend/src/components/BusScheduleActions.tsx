import type {BusSchedule} from "../types";
import {Button} from "react-bootstrap";

type BusScheduleActionsProps = {
    schedule: BusSchedule;
    onEdit?: (schedule: BusSchedule) => void;
    onDelete?: (schedule: BusSchedule) => void;
}

const BusScheduleActions = ({
    schedule,
    onEdit,
    onDelete}: BusScheduleActionsProps) => {
    if (!onEdit && !onDelete) return null;

    return (
        <div className="schedule-actions ms-5">
            {onEdit && (
                <Button
                    size="sm"
                    className="me-2"
                    variant="outline-primary"
                    onClick={() => onEdit?.(schedule)}
                >
                    ✏️ Уреди
                </Button>
            )}
            {onDelete && (
                <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => onDelete?.(schedule)}
                >
                    ❌ Избриши
                </Button>
            )}
        </div>
    );
};

export default BusScheduleActions;