type PaginationProps = {
    page: number;
    setPage: (value) => void;
    totalPages: number;
}

const CustomPagination = ({
    page,
    setPage,
    totalPages}: PaginationProps) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <ul className="pagination custom-pagination">
                <li className={`page-item ${page === 0 ? 'disabled' : ''}`}>
                    <button className="page-link"
                            onClick={() => setPage(prev => Math.max(prev - 1, 0))}>
                        Претходна
                    </button>
                </li>

                {page > 2 && (
                    <>
                        <li className="page-item">
                            <button className="page-link" onClick={() => setPage(0)}>1</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link" onClick={() => setPage(1)}>2</button>
                        </li>
                        {page > 3 && <li className="page-item disabled"><span
                            className="page-link">...</span></li>}
                    </>
                )}

                {Array.from({length: totalPages}, (_, i) => i)
                    .filter(i => i >= page - 1 && i <= page + 1)
                    .map(i => (
                        <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => setPage(i)}>
                                {i + 1}
                            </button>
                        </li>
                    ))
                }

                {page < totalPages - 3 && (
                    <>
                        {page < totalPages - 4 && <li className="page-item disabled"><span
                            className="page-link">...</span></li>}
                        <li className="page-item">
                            <button className="page-link"
                                    onClick={() => setPage(totalPages - 2)}>{totalPages - 1}</button>
                        </li>
                        <li className="page-item">
                            <button className="page-link"
                                    onClick={() => setPage(totalPages - 1)}>{totalPages}</button>
                        </li>
                    </>
                )}

                <li className={`page-item ${page + 1 >= totalPages ? 'disabled' : ''}`}>
                    <button className="page-link"
                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}>
                        Следна
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default CustomPagination;