import { Box, Typography } from '@mui/material';
import type { HealthCheckEntry } from '../../types/entries';

export default function HealthCheckEntry({ entry } : { entry: HealthCheckEntry }) {
    return (
        <Box>
            <Typography>
                <span>Health check rating: {entry.healthCheckRating}</span>
            </Typography>
        </Box>
    );
}