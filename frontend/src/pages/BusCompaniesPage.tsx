import {useEffect, useState} from 'react';
import type {BusCompany} from '../types';
import {getAllBusCompanies} from '../services/busCompanyService';
import BusCompanyCard from "../components/BusCompanyCard.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";

const BusCompaniesPage = () => {
    const [busCompanies, setBusCompanies] = useState<BusCompany[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            try {
                const data = await getAllBusCompanies();
                setBusCompanies(data);
            } catch {
                setError("Грешка при преземање на компаниите.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="d-flex align-items-center justify-content-center bus-image-div">
            <div className="bus-container container h-100 bg-white bg-opacity-75 p-4 rounded shadow">
                <h2 className="text-center mb-1">
                    Автобуски компании
                </h2>
                <p className="header-paragraph text-center fst-italic mb-4 fs-6">
                    Прегледај ги достапните автобуски компании
                </p>

                {loading ? (
                    <LoadingSpinner/>
                ) : error ? (
                    <p className="p-4 text-danger text-center">{error}</p>
                ) : (
                    <div className="bus-company-cards row align-middle">
                        {busCompanies.map((company) => (
                            <BusCompanyCard
                                key={company.id}
                                company={company}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BusCompaniesPage;