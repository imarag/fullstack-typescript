import { Box, Typography } from '@mui/material';
import type { OccupationalHealthcareEntry } from '../../types/entries';

export default function OccupationalHealthcareEntry({ entry } : { entry: OccupationalHealthcareEntry }) {
    return (
        <Box>
            <Typography>
                <span>Sick leave dates:</span>
            </Typography>
            <Typography>
                <span>{entry.sickLeave?.startDate}</span>
                <span>{' '}to{' '}</span>
                <span>{entry.sickLeave?.endDate}</span>
            </Typography>
            <Typography>
                diagnosed by {entry.employerName}
            </Typography>
        </Box>
    )
}