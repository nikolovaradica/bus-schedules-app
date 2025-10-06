import type {BusCompany, BusSchedule, City} from "../types";
import {useEffect, useState} from "react";
import {searchSchedules} from "../services/busScheduleService.ts";
import BusScheduleCard from "../components/BusScheduleCard.tsx";
import {useSearchParams} from "react-router-dom";
import {getAllBusCompanies} from "../services/busCompanyService.ts";
import {getAllCities} from "../services/cityService.ts";
import {format} from "date-fns";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import SearchForm from "../components/SearchForm.tsx";
import CustomPagination from "../components/CustomPagination.tsx";

const BusSchedulesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [cityFrom, setCityFrom] = useState(searchParams.get("from") || "");
    const [cityTo, setCityTo] = useState(searchParams.get("to") || "");
    const [departureDate, setDepartureDate] = useState(searchParams.get("departureDate") ? new Date(searchParams.get("departureDate") as string) : null);
    const [selectedCompany, setSelectedCompany] = useState(searchParams.get("company") || "");

    const [cities, setCities] = useState<City[]>([]);
    const [schedules, setSchedules] = useState<BusSchedule[]>([]);
    const [companies, setCompanies] = useState<BusCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

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

    useEffect(() => {
        const params = new URLSearchParams();
        const formattedDepartureDate = departureDate ? format(departureDate, 'yyyy-MM-dd') : undefined;

        if (cityFrom) params.append("from", cityFrom);
        if (cityTo) params.append("to", cityTo);
        if (formattedDepartureDate) params.append("departureDate", formattedDepartureDate);
        if (selectedCompany) params.append("company", selectedCompany);
        params.append("page", String(page));
        params.append("size", String(size));
        setSearchParams(params);

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const {schedules: data, totalPages} = await searchSchedules(
                    page,
                    size,
                    cityFrom,
                    cityTo,
                    selectedCompany,
                    formattedDepartureDate
                );
                setSchedules(data);
                setTotalPages(totalPages);
            } catch {
                setError("Грешка при преземање на линиите.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cityFrom, cityTo, departureDate, selectedCompany, page, size]);

    useEffect(() => {
        setPage(0);
    }, [cityFrom, cityTo, departureDate, selectedCompany]);


    return (
        <div className="d-flex align-items-center justify-content-center bus-image-div">
            <div className="bus-container container bg-white bg-opacity-75 p-4 mb-5 rounded shadow">
                <h2 className="text-center mb-1">Автобуски линии</h2>
                <p className="header-paragraph text-center fst-italic mb-4 fs-6">
                    Пребарај ги сите меѓуградски автобуски линии во државата, на едно место.
                </p>

                <div className="card border-0 mb-4 bg-transparent">
                    <div className="card-body">
                        <SearchForm
                            cities={cities}
                            companies={companies}
                            cityFrom={cityFrom}
                            cityTo={cityTo}
                            departureDate={departureDate}
                            company={selectedCompany}
                            onCityFromChange={setCityFrom}
                            onCityToChange={setCityTo}
                            onDepartureDateChange={setDepartureDate}
                            onCompanyChange={setSelectedCompany}
                            showSwapButton={true}
                        />
                    </div>
                </div>

                {loading ? (
                    <LoadingSpinner/>
                ) : error ? (
                    <p className="p-4 text-danger text-center">{error}</p>
                ) : schedules.length === 0 ? (
                    <p className="text-center text-muted">Не се пронајдени автобуски линии за избраните филтри.</p>
                ) : (
                    <>
                        <div className="d-grid gap-2">
                            {schedules.map((schedule) => (
                                <BusScheduleCard key={schedule.id} schedule={schedule}/>
                            ))}
                            <CustomPagination
                                page={page}
                                setPage={setPage}
                                totalPages={totalPages}
                            />
                        </div>
                    </>
                )
                }
            </div>
        </div>
    )
};

export default BusSchedulesPage;