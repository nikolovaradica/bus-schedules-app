import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import type {BusSchedule} from "../types";

type BusScheduleTimeProps = {
    schedule: BusSchedule
}

const BusScheduleTime = ({schedule}: BusScheduleTimeProps) => {
    return (
        <div className="schedule-time">
            <FontAwesomeIcon icon={faClock} className="me-2"/>
            <span className="fs-5 fw-bold">
                {schedule.departureTime}
            </span>
        </div>
    );
};

export default BusScheduleTime;