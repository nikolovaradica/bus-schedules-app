import type {BusCompany} from "../types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faExternalLink } from '@fortawesome/free-solid-svg-icons'

type BusCompanyCardProps = {
    company: BusCompany;
}

const BusCompanyCard = ({ company }: BusCompanyCardProps) => {
    return (
        <div className="col-md-6 col-lg-4 column">
            <div className="card rounded">
                <div className="txt">
                    <h1>{company.name}</h1>
                    {company.contactEmail && (
                        <p className="fs-6 fw-medium">
                            <FontAwesomeIcon icon={faEnvelope} className="me-2" />
                            {company.contactEmail}
                        </p>
                    )}
                    {company.contactPhoneNumber && (
                        <p className="fs-6 fw-medium">
                            <FontAwesomeIcon icon={faPhone} className="me-2" />
                            {company.contactPhoneNumber}
                        </p>
                    )}
                </div>
                {company.webPage && (
                    <a
                        href={ company.webPage.startsWith("http") ? company.webPage : `https://${company.webPage}` }
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FontAwesomeIcon icon={faExternalLink} className="me-2" />
                        Вебсајт
                    </a>
                )}
            </div>
        </div>
    );
};

export default BusCompanyCard;