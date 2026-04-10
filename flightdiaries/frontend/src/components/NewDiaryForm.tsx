import { useState } from "react";
import type { NewDiaryEntry, DiaryEntry } from "../types/diaries";
import { addOne } from "../services/diary";
import axios from "axios";
import type { ZodErrorResponse } from "../types/response";
import { Visibility, Weather } from "../types/diaries";


type Props = {
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
};

export default function NewDiaryForm({ setDiaries }: Props) {
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");
  const [weather, setWeather] =
    useState<NewDiaryEntry["weather"]>("sunny");
  const [visibility, setVisibility] =
    useState<NewDiaryEntry["visibility"]>("great");
  const [error, setError] = useState<string[]>([]);

  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();

    if (!date || !weather || !visibility) {
      setError(["All fields are required"]);
      return;
    }

    const newEntry: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    };

    try {
      const createdEntry = await addOne(newEntry);

      setDiaries((prev) => [...prev, createdEntry]);
      setError([]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const data = error.response?.data as ZodErrorResponse | undefined;

        const errorMessages =
          data?.error?.map((e) => e.message) ?? ["Unknown error"];

        setError(errorMessages);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new entry</h2>

      {error.length > 0 && (
        <ul style={{ color: "red" }}>
          {error.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <p>Weather:</p>

        {Object.values(Weather).map((w) => (
          <label key={w}>
            <input
              type="radio"
              name="weather"
              value={w}
              checked={weather === w}
              onChange={() =>
                setWeather(w as NewDiaryEntry["weather"])
              }
            />
            {w}
          </label>
        ))}
      </div>

      <div>
        <p>Visibility:</p>

        {Object.values(Visibility).map((v) => (
          <label key={v}>
            <input
              type="radio"
              name="visibility"
              value={v}
              checked={visibility === v}
              onChange={() =>
                setVisibility(v as NewDiaryEntry["visibility"])
              }
            />
            {v}
          </label>
        ))}
      </div>
        <div>
        <p>Comment:</p>

        <label>
            <input
              type="text"
              name="comment"
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />
          </label>
      </div>
      <button type="submit">Add diary</button>
    </form>
  );
}