import { useState } from 'react';
import React from 'react';
import {
  TextField,
  Button,
  Stack,
  Typography,
  Select,
  MenuItem,
  Alert,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import patientService from '../services/patients';
import type { EntryWithoutId } from '../types/entries';
import { HealthCheckRating, EntryType } from '../types/entries';
import type { Patient } from '../types/patients';
import axios from 'axios';
import type { Diagnosis } from '../types/diagnoses';

interface AddEntryFormProps {
  setShowAddEntryForm: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
  diagnoses: Diagnosis[] | null
}

export default function AddEntryForm({
  setShowAddEntryForm,
  patientId,
  setPatient,
  diagnoses
}: AddEntryFormProps) {
  const [entrySelected, setEntrySelected] = useState<EntryType>('health-check');
  const [error, setError] = useState('');


  const [healthCheckEntry, setHealthCheckEntry] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [] as string[],
    healthCheckRating: HealthCheckRating.Healthy,
  });

  const [hospitalEntry, setHospitalEntry] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [] as string[],
    discharge: {
      date: '',
      criteria: '',
    },
  });

  const [occupationalEntry, setOccupationalEntry] = useState({
    description: '',
    date: '',
    specialist: '',
    diagnosisCodes: [] as string[],
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: '',
    },
  });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    let newEntry: EntryWithoutId;

    if (entrySelected === 'health-check') {
      newEntry = {
        type: 'HealthCheck',
        ...healthCheckEntry,
        diagnosisCodes: healthCheckEntry.diagnosisCodes
          ? healthCheckEntry.diagnosisCodes
          : [],
      };
    } else if (entrySelected === 'hospital') {
      newEntry = {
        type: 'Hospital',
        ...hospitalEntry,
        diagnosisCodes: hospitalEntry.diagnosisCodes
          ? hospitalEntry.diagnosisCodes
          : [],
      };
    } else {
      newEntry = {
        type: 'OccupationalHealthcare',
        ...occupationalEntry,
        diagnosisCodes: occupationalEntry.diagnosisCodes
          ? occupationalEntry.diagnosisCodes
          : [],
      };
    }

    try {
      const updatedPatient = await patientService.addEntry(
        newEntry,
        patientId
      );
      setPatient(updatedPatient);
      setShowAddEntryForm(false);
    } catch (err: unknown) {
      let errorMessage = 'An error occurred';

      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        errorMessage = data?.error || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant='h5'>New Entry</Typography>

        <Select
          value={entrySelected}
          onChange={(e) => setEntrySelected(e.target.value as EntryType)}
        >
          {Object.values(EntryType).map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>

        {error && <Alert severity='error'>{error}</Alert>}


        <TextField
          label='Description'
          value={
            entrySelected === 'health-check'
              ? healthCheckEntry.description
              : entrySelected === 'hospital'
              ? hospitalEntry.description
              : occupationalEntry.description
          }
          onChange={(e) => {
            const value = e.target.value;
            if (entrySelected === 'health-check')
              setHealthCheckEntry((p) => ({ ...p, description: value }));
            else if (entrySelected === 'hospital')
              setHospitalEntry((p) => ({ ...p, description: value }));
            else
              setOccupationalEntry((p) => ({ ...p, description: value }));
          }}
          fullWidth
        />

        <TextField
          label='Date'
          type='date'
          slotProps={{ inputLabel: { shrink: true } }}
          value={
            entrySelected === 'health-check'
              ? healthCheckEntry.date
              : entrySelected === 'hospital'
              ? hospitalEntry.date
              : occupationalEntry.date
          }
          onChange={(e) => {
            const value = e.target.value;
            if (entrySelected === 'health-check')
              setHealthCheckEntry((p) => ({ ...p, date: value }));
            else if (entrySelected === 'hospital')
              setHospitalEntry((p) => ({ ...p, date: value }));
            else
              setOccupationalEntry((p) => ({ ...p, date: value }));
          }}
          fullWidth
        />

        <TextField
          label='Specialist'
          value={
            entrySelected === 'health-check'
              ? healthCheckEntry.specialist
              : entrySelected === 'hospital'
              ? hospitalEntry.specialist
              : occupationalEntry.specialist
          }
          onChange={(e) => {
            const value = e.target.value;
            if (entrySelected === 'health-check')
              setHealthCheckEntry((p) => ({ ...p, specialist: value }));
            else if (entrySelected === 'hospital')
              setHospitalEntry((p) => ({ ...p, specialist: value }));
            else
              setOccupationalEntry((p) => ({ ...p, specialist: value }));
          }}
          fullWidth
        />
        <InputLabel id='diagnosis-label'>Diagnosis Codes</InputLabel>
        <Select
            labelId='diagnosis-label'
            multiple
            value={
            entrySelected === 'health-check'
                ? healthCheckEntry.diagnosisCodes
                : entrySelected === 'hospital'
                ? hospitalEntry.diagnosisCodes
                : occupationalEntry.diagnosisCodes
            }
            onChange={(e) => {
            const value = e.target.value as string[];

            if (entrySelected === 'health-check')
                setHealthCheckEntry((p) => ({ ...p, diagnosisCodes: value }));
            else if (entrySelected === 'hospital')
                setHospitalEntry((p) => ({ ...p, diagnosisCodes: value }));
            else
                setOccupationalEntry((p) => ({ ...p, diagnosisCodes: value }));
            }}
            input={<OutlinedInput label='Diagnosis Codes' />}
        >
            {(diagnoses as Diagnosis[]).map((diag) => (
            <MenuItem key={diag.code} value={diag.code}>
                {diag.code}{'-'}{diag.name}
            </MenuItem>
            ))}
        </Select>


        {entrySelected === 'health-check' && (
          <Select
            value={healthCheckEntry.healthCheckRating}
            onChange={(e) =>
              setHealthCheckEntry((p) => ({
                ...p,
                healthCheckRating: e.target.value,
              }))
            }
          >
            {Object.values(HealthCheckRating).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </Select>
        )}

        {entrySelected === 'hospital' && (
          <>
            <TextField
              label='Discharge Date'
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
              value={hospitalEntry.discharge.date}
              onChange={(e) =>
                setHospitalEntry((p) => ({
                  ...p,
                  discharge: { ...p.discharge, date: e.target.value },
                }))
              }
              fullWidth
            />
            <TextField
              label='Discharge Criteria'
              value={hospitalEntry.discharge.criteria}
              onChange={(e) =>
                setHospitalEntry((p) => ({
                  ...p,
                  discharge: { ...p.discharge, criteria: e.target.value },
                }))
              }
              fullWidth
            />
          </>
        )}

        {entrySelected === 'occupational-healthcheck' && (
          <>
            <TextField
              label='Employer Name'
              value={occupationalEntry.employerName}
              onChange={(e) =>
                setOccupationalEntry((p) => ({
                  ...p,
                  employerName: e.target.value,
                }))
              }
              fullWidth
            />

            <TextField
              label='Sick Leave Start'
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
              value={occupationalEntry.sickLeave.startDate}
              onChange={(e) =>
                setOccupationalEntry((p) => ({
                  ...p,
                  sickLeave: {
                    ...p.sickLeave,
                    startDate: e.target.value,
                  },
                }))
              }
              fullWidth
            />

            <TextField
              label='Sick Leave End'
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
              value={occupationalEntry.sickLeave.endDate}
              onChange={(e) =>
                setOccupationalEntry((p) => ({
                  ...p,
                  sickLeave: {
                    ...p.sickLeave,
                    endDate: e.target.value,
                  },
                }))
              }
              fullWidth
            />
          </>
        )}

        <Button type='submit' variant='contained'>
          Add
        </Button>

        <Button
          type='button'
          variant='outlined'
          onClick={() => setShowAddEntryForm(false)}
        >
          Cancel
        </Button>
      </Stack>
    </form>
  );
}