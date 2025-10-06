import {useEffect, useState} from "react";
import type {BusCompany, City} from "../types";
import {getAllCities} from "../services/cityService.ts";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {getAllBusCompanies} from "../services/busCompanyService.ts";
import SearchForm from "../components/SearchForm.tsx";

const HomePage = () => {
    const navigate = useNavigate();

    const [cities, setCities] = useState<City[]>([]);
    const [companies, setCompanies] = useState<BusCompany[]>([]);
    const [cityFrom, setCityFrom] = useState<string>("");
    const [cityTo, setCityTo] = useState<string>("");
    const [departureDate, setDepartureDate] = useState<Date | null>(null);
    const [company, setCompany] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const fetchedCities = await getAllCities();
                setCities(fetchedCities);
                const fetchedCompanies = await getAllBusCompanies();
                setCompanies(fetchedCompanies);
            } catch {
                setError("Грешка при преземање на податоците.");
            }
        };
        fetchData();
    }, []);

    const handleSearch = async () => {

        const params = new URLSearchParams();
        if (cityFrom) params.append("from", cityFrom);
        if (cityTo) params.append("to", cityTo);
        if (departureDate) params.append("departureDate", format(departureDate, 'yyyy-MM-dd'));
        if (company) params.append("company", company);

        navigate(`/avtobuski-linii?${params.toString()}`);
    }

    return (
        <div className="d-flex align-items-center justify-content-center bus-image-div">
            <div className="container bg-white bg-opacity-75 p-4 rounded shadow">
                <h2 className="text-center mb-1">Пребарај автобуски линии</h2>
                <p className="header-paragraph text-center fst-italic mb-4 fs-6">
                    Пребарај ги сите меѓуградски автобуски линии во државата, на едно место.
                </p>

                {error ? (
                    <p className="p-4 text-danger text-center">{error}</p>
                ) : (
                    <SearchForm
                        cities={cities}
                        companies={companies}
                        cityFrom={cityFrom}
                        cityTo={cityTo}
                        departureDate={departureDate}
                        company={company}
                        onCityFromChange={setCityFrom}
                        onCityToChange={setCityTo}
                        onDepartureDateChange={setDepartureDate}
                        onCompanyChange={setCompany}
                        onSearch={handleSearch}
                    />
                )}
            </div>
        </div>
    )
}

export default HomePage;