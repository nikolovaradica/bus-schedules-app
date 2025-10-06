import type { BusSchedule } from "../types";
import {Button} from "react-bootstrap";
import BusScheduleCard from "../components/BusScheduleCard";
import {useEffect, useState} from "react";
import {ScheduleModal} from "../components/ScheduleModal.tsx";
import {createSchedule, deleteSchedule, searchSchedules, updateSchedule} from "../services/busScheduleService.ts";
import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.tsx";
import LoadingSpinner from "../components/LoadingSpinner.tsx";
import CustomPagination from "../components/CustomPagination.tsx";

const CompanySchedulesPage = () => {
    const {user} = useAuth();

    const [schedules, setSchedules] = useState<BusSchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [showModal, setShowModal] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState<BusSchedule | null>(null);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setLoading(true);

            try {
                const {schedules: data, totalPages} = await searchSchedules(
                    page,
                    size,
                    undefined,
                    undefined,
                    user?.companyName
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
    }, [page, size]);

    const handleAdd = () => {
        setSelectedSchedule(null);
        setShowModal(true);
    };

    const handleEdit = (schedule: BusSchedule) => {
        setSelectedSchedule(schedule);
        setShowModal(true);
    };

    const handleDelete = async (schedule: BusSchedule) => {
        if (!window.confirm(`Дали сте сигурни дека сакате да ја избришете линијата ${schedule.cityFrom} - ${schedule.cityTo} во ${schedule.departureTime}?`)) return;
        try {
            await deleteSchedule(schedule.id!);
            setSchedules((prev) => prev.filter(s => s.id !== schedule.id));
        } catch (err) {
            console.error(err);
            alert('Грешка при бришење на линијата');
        }
    };

    const handleSave = async (data: Partial<BusSchedule> & { days: string[]; holidays: boolean }) => {
        try {
            let updatedSchedule: BusSchedule;
            if (selectedSchedule) {
                updatedSchedule = await updateSchedule(selectedSchedule.id!, {...data, company: user?.companyName});
                setSchedules((prev) => prev.map(s => s.id === updatedSchedule.id ? updatedSchedule : s));
            } else {
                updatedSchedule = await createSchedule({...data, company: user?.companyName});
                setSchedules((prev) => [updatedSchedule, ...prev]);
            }
            setShowModal(false);
        } catch (err) {
            console.error(err);
            alert('Грешка при зачувување/уредување на линијата');
        }
    };

    if (!user) return <Navigate to="/" replace />;

    return (
        <div className="d-flex align-items-center justify-content-center bus-image-div">
            <div className="bus-container container bg-white bg-opacity-75 p-4 rounded shadow">
                <h2 className="text-center mb-1">Вашите автобуски линии</h2>
                <p className="header-paragraph text-center fst-italic mb-4 fs-6">
                    Уредете ги вашите веќе постоечки линии или додадете нови
                </p>

                <div className="d-flex justify-content-end mb-3">
                    <Button variant="success" onClick={handleAdd}>
                        ➕ Додади нова линија
                    </Button>
                </div>

                {loading ? (
                    <LoadingSpinner/>
                ) : error ? (
                  <p className="p-4 text-center text-danger">{error}</p>
                ) : schedules.length === 0 ? (
                    <p className="text-center text-muted">
                        Немате внесено автобуски линии.
                    </p>
                ) : (
                    <div className="d-grid gap-2">
                        {schedules.map((schedule) => (
                            <BusScheduleCard
                                key={schedule.id}
                                schedule={schedule}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                        <CustomPagination
                            page={page}
                            setPage={setPage}
                            totalPages={totalPages}
                        />
                    </div>
                )}
            </div>

            <ScheduleModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onSave={handleSave}
                schedule={selectedSchedule}
            />
        </div>
    )
}

export default CompanySchedulesPage;