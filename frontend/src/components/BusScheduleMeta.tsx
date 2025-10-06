import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBus} from "@fortawesome/free-solid-svg-icons";
import type {BusSchedule} from "../types";

type BusScheduleMetaProps = {
    schedule: BusSchedule;
}

const BusScheduleMeta = ({schedule}: BusScheduleMetaProps) => {
    return (
        <div className="schedule-meta text-end">
            <div className="d-flex align-items-center justify-content-end">
                <FontAwesomeIcon icon={faBus} className="schedule-bus-icon me-2"/>
                <span className="fw-semibold">{schedule.company}</span>
            </div>
            <small className="text-muted">{schedule.daysAvailable}</small>
        </div>
    );
};

export default BusScheduleMeta;