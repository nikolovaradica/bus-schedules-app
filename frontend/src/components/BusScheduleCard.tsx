import type {BusSchedule} from "../types";
import {Card} from "react-bootstrap";
import BusScheduleActions from "./BusScheduleActions.tsx";
import BusScheduleRoute from "./BusScheduleRoute.tsx";
import BusScheduleMeta from "./BusScheduleMeta.tsx";
import BusScheduleTime from "./BusScheduleTime.tsx";

type BusScheduleCardProps = {
    schedule: BusSchedule;
    onEdit?: (schedule: BusSchedule) => void;
    onDelete?: (schedule: BusSchedule) => void;
}

const BusScheduleCard = ({schedule, onEdit, onDelete}: BusScheduleCardProps) => {
    return (
        <Card className="bus-card shadow-sm border-0 rounded-4 mb-3">
            <Card.Body className="schedule-grid p-3">
                <BusScheduleTime
                    schedule={schedule}
                />
                <BusScheduleRoute
                    schedule={schedule}
                />
                <BusScheduleMeta
                    schedule={schedule}
                />
                <BusScheduleActions
                    schedule={schedule}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </Card.Body>
        </Card>
    );
};

export default BusScheduleCard;