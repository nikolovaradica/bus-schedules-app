import { useRef } from 'react';

type TimePickerInputProps = {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
};

const TimePickerInput = ({ value, onChange, placeholder }: TimePickerInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleWrapperClick = () => {
        inputRef.current?.showPicker?.(); // modern browsers
        inputRef.current?.focus();
    };

    return (
        <div
            className="timepicker-wrapper"
            onClick={handleWrapperClick}
        >
            <input
                type="time"
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="form-control"
                placeholder={placeholder || 'Изберете време'}
            />
        </div>
    );
};

export default TimePickerInput;
