import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { arrayContainNumbers } from './helpers.ts';


const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const queryParams = req.query;

    const height: number = Number(queryParams?.height);
    const weight: number = Number(queryParams?.weight);

    if (Number.isNaN(height) || Number.isNaN(weight)) {
        return res.status(400).json({
            error: 'malformatted parameters',
        });
    }
    const bmi = calculateBmi(height, weight);
    return res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target ) {
        return res.status(400).json({error: "parameters missing"});
    }

    if (Number.isNaN(Number(target))) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    if (!Array.isArray(daily_exercises) || !arrayContainNumbers(daily_exercises)) {
        return res.status(400).json({error: "malformatted parameters"});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument 
    const result = calculateExercises(daily_exercises, Number(target));
    return res.send(result);
});

app.listen(3000, () => {
    console.log('Server running.');
});
