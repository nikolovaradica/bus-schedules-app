import {useState} from "react";
import {Dropdown, Form} from "react-bootstrap";

type DropdownOption = {
    id: string | number;
    name: string;
};

type CustomDropdownProps = {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: DropdownOption[];
    placeholder?: string;
    excludeOption?: string;
};

const CustomDropdown = ({
                            label,
                            value,
                            onChange,
                            options,
                            placeholder,
                            excludeOption,
                        }: CustomDropdownProps) => {
    const [show, setShow] = useState(false);
    const filteredOptions = excludeOption
        ? options.filter((opt) => opt.name !== excludeOption)
        : options;
    const finalOptions = [{id: "", name: placeholder || "Сите"}, ...filteredOptions];

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Dropdown show={show} onToggle={() => setShow(!show)}>
                <Dropdown.Toggle
                    as="div"
                    className={`custom-dropdown-toggle form-control d-flex justify-content-between align-items-center`}
                    onClick={() => setShow(!show)}
                >
                    {value || placeholder || "Избери опција"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="custom-dropdown-menu w-100">
                    <>{finalOptions.map((option) => (
                        <Dropdown.Item
                            key={option.id}
                            onClick={() => {
                                if (option.id === "") {
                                    onChange("");
                                } else {
                                    onChange(option.name);
                                }
                                setShow(false);
                            }}
                        >
                            {option.name}
                        </Dropdown.Item>
                    ))}</>
                </Dropdown.Menu>
            </Dropdown>
        </Form.Group>
    );
};

export default CustomDropdown;
