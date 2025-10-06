const LoadingSpinner = () => {
    return (
        <div className="d-flex justify-content-center align-items-center loading-spinner-container">
            <div className="spinner-border loading-spinner" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;