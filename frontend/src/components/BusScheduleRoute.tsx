import type {BusSchedule} from "../types";

type BusScheduleRouteProps = {
    schedule: BusSchedule;
}

const BusScheduleRoute = ({schedule}: BusScheduleRouteProps) => {
    return (
        <div className="schedule-route">
            <div className="route-grid">
                <div className="from text-truncate" title={schedule.cityFrom}>
                    {schedule.cityFrom}
                </div>

                <div className="line">
                    <span className="dot"/>
                    <span className="rule"/>
                    <span className="dot"/>
                </div>

                <div className="to text-truncate" title={schedule.cityTo}>
                    {schedule.cityTo}
                </div>
            </div>
        </div>
    );
};

export default BusScheduleRoute;