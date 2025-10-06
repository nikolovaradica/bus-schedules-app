import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {faCalendar, faX} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type DatePickerInputProps = {
    selectedDate: Date | null;
    onChange: (value: Date | null) => void;
    placeholder: string;
}

const DatePickerInput = ({selectedDate, onChange, placeholder}: DatePickerInputProps) => {
    return (
        <div className="datepicker-wrapper">
            <DatePicker
                selected={selectedDate as Date}
                onChange={onChange}
                placeholderText={placeholder || "Изберете датум"}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                wrapperClassName="w-100"
            />
            <span
                className="calendar-icon"
                onClick={() => selectedDate && onChange(null)}
            >
                <FontAwesomeIcon
                    icon={selectedDate ? faX : faCalendar}
                />
            </span>
        </div>
    );
};

export default DatePickerInput;