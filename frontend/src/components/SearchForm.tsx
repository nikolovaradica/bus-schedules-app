import {Button, Col, Form, Row} from "react-bootstrap";
import DatePickerInput from "./DatePickerInput";
import CustomDropdown from "./CustomDropdown";
import type {BusCompany, City} from "../types";
import {faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface SearchFormProps {
    cities: City[];
    companies: BusCompany[];
    cityFrom: string;
    cityTo: string;
    departureDate: Date | null;
    company: string;
    onCityFromChange: (val: string) => void;
    onCityToChange: (val: string) => void;
    onDepartureDateChange: (val: Date | null) => void;
    onCompanyChange: (val: string) => void;
    onSearch?: () => void;
    showSwapButton?: boolean;
}

const SearchForm = ({
                        cities,
                        companies,
                        cityFrom,
                        cityTo,
                        departureDate,
                        company,
                        onCityFromChange,
                        onCityToChange,
                        onDepartureDateChange,
                        onCompanyChange,
                        onSearch = null,
                        showSwapButton = false
                    }: SearchFormProps) => {
    return (
        <Form>
            <Row className={showSwapButton ? "d-md-grid swap-button-row" : "gy-3"}>
                <Col md={showSwapButton ? undefined : 6} xs={12}>
                    <CustomDropdown
                        label="Од"
                        value={cityFrom}
                        onChange={(val) => {
                            onCityFromChange(val);
                            if (val === cityTo) onCityToChange("");
                        }}
                        options={cities}
                        placeholder="Избери град"
                    />
                </Col>
                <>{showSwapButton && (
                    <Col xs={12} className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon
                            icon={faArrowRightArrowLeft}
                            className="swap-icon text-secondary mt-4"
                            title="Swap cities"
                            onClick={() => {
                                onCityFromChange(cityTo);
                                onCityToChange(cityFrom);
                            }}
                        />
                    </Col>
                )}</>
                <Col md={showSwapButton ? undefined : 6} xs={12}>
                    <CustomDropdown
                        label="До"
                        value={cityTo}
                        onChange={onCityToChange}
                        options={cities}
                        placeholder="Избери град"
                        excludeOption={cityFrom}
                    />
                </Col>
            </Row>
            <Row className="g-3 mt-2">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Поаѓање</Form.Label>
                        <DatePickerInput
                            selectedDate={departureDate}
                            onChange={onDepartureDateChange}
                            placeholder="Избери датум"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <CustomDropdown
                            label="Компанија"
                            value={company}
                            onChange={onCompanyChange}
                            options={companies}
                            placeholder="Избери компанија"
                        />
                    </Form.Group>
                </Col>
            </Row>

            <>{onSearch && (
                <><div className="text-center mt-4">
                    <Button className="search-button" size="lg" onClick={onSearch}>
                        Најди линии
                    </Button>
                </div>
                <p className="text-center text-muted mb-0 fs-6">
                Над 20 автобуски компании • 50+ дестинации низ Македонија
                </p></>
            )}</>
        </Form>
    );
};

export default SearchForm;