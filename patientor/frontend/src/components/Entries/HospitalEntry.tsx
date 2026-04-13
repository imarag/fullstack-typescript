import { Box, Typography } from '@mui/material';
import type { HospitalEntry } from '../../types/entries';

export default function HospitalEntry({ entry } : { entry: HospitalEntry }) {
    return (
        <Box>
            <Typography>
                <span>Discharge:</span>
                <span>{entry.discharge.date}</span>
                <span>{entry.discharge.criteria}</span>
            </Typography>
        </Box>
    )
}