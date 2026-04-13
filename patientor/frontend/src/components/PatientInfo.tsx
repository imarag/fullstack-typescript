import type { Patient } from '../types/patients';
import MaleSharpIcon from '@mui/icons-material/MaleSharp';
import FemaleSharpIcon from '@mui/icons-material/FemaleSharp';
import TransgenderSharpIcon from '@mui/icons-material/TransgenderSharp';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import patientService from '../services/patients';
import { Stack, Typography, Box } from '@mui/material';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import EntryDetails from './Entries/EntryDetails';
import AddEntryForm from './AddEntryForm';
import type { Diagnosis } from '../types/diagnoses';

export default function PatientInfo({ diagnoses } : { diagnoses: Diagnosis[] | null }) {
    const { id } = useParams();

    const [patient, setPatient] = useState<Patient | null>(null);
    const [showAddEntryForm, setShowAddEntryForm] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (!id) {
                return;
            }
            const data = await patientService.getOne(id);
            setPatient(data);
        }

        fetchData();
    }, [id]);


    if (!patient) {
        return <Typography>No patient found.</Typography>;
    }

    const iconMap = {
        'male': MaleSharpIcon,
        'female': FemaleSharpIcon,
        'other': TransgenderSharpIcon
    };

    const GenderIcon = iconMap[patient.gender] || iconMap['male'];

    return (
        <div>
            <Typography variant='h4' component='h3'>
                <Stack direction='row' spacing={2} alignItems='center'>
                    <span>{patient.name}</span>
                    <GenderIcon />
                </Stack>           
            </Typography>
            <List>
                <ListItem sx={{ py: 0 }}>
                    <ListItemText primary={`ssn: ${patient.ssn}`} />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                    <ListItemText primary={`occupation: ${patient.occupation}`} />
                </ListItem>
                <ListItem sx={{ py: 0 }}>
                    <ListItemText primary={`date of birth: ${patient.dateOfBirth}`} />
                </ListItem>
            </List>
            <Typography variant='h5' component='h4'>
                entries
            </Typography>
            <Box>
                {
                    patient.entries.map(entry => {
                        const diagCodes = entry?.diagnosisCodes || [];
                        return (
                            <Box key={entry.id}>
                                <Box>
                                    <Stack direction='row' spacing={2} alignItems='start'>
                                        <span>{entry.date}</span>
                                        <span>{entry.description}</span>
                                    </Stack>
                                </Box>
                                {
                                    diagCodes.length > 0 && (
                                        <List>
                                            {diagCodes.map(code => {
                                                if (!diagnoses) {
                                                    return null;
                                                }
                                                const diagName = diagnoses.find(d => d.code === code);
                                                return diagName ? (
                                                    <ListItem key={code} sx={{ py: 0 }}>{code} {diagName ? diagName.name : ''}</ListItem>
                                                ) : null;
                                            })}
                                        </List>
                                    )
                                }
                                <EntryDetails entry={entry} />
                            </Box>
                        );
                    })
                }
            </Box>
            {
                showAddEntryForm ? (
                    <AddEntryForm setShowAddEntryForm={setShowAddEntryForm}  patientId={patient.id} setPatient={setPatient} diagnoses={diagnoses} />
                ) : (
                    <Button  variant='contained' color='primary' onClick={() => setShowAddEntryForm(!showAddEntryForm)}>
                        add new entry
                    </Button>
                )
            }
        </div>
    );
}