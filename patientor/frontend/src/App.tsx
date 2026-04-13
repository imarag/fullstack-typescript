import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import type { Patient } from './types/patients';

import patientService from './services/patients';
import PatientListPage from './components/PatientListPage';

import PatientInfo from './components/PatientInfo';
import diagnosesService from './services/diagnoses';
import type { Diagnosis } from './types/diagnoses';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
        async function fetchDiagnosesData() {
            const data = await diagnosesService.getAll();
            setDiagnoses(data);
        };
        void fetchDiagnosesData();
    }, []);

  return (
    <div className='App'>
      <Container>
        <Typography variant='h3' sx={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to='/' variant='contained' color='primary'>
          Home
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Routes>
          <Route path='/' element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path='/patients/:id' element={<PatientInfo diagnoses={diagnoses} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
