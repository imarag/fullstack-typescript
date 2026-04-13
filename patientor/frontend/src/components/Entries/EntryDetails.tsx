import type { Entry } from '../../types/entries';
import HealthCheckEntry from './HealthCheckEntry';
import HospitalEntry from './HospitalEntry';
import OccupationalHealthcareEntry from './OccupationalHealthcareEntry';

export default function EntryDetails({ entry }: { entry: Entry }) {
    switch (entry.type) {
        case 'HealthCheck':
            return <HealthCheckEntry entry={entry} />;
        case 'OccupationalHealthcare':
            return <OccupationalHealthcareEntry entry={entry} />;
        case 'Hospital':
            return <HospitalEntry entry={entry} />;
    }
}