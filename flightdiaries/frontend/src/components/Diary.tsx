import type { DiaryEntry } from "../types/diaries"

export default function Diary({ diary }: { diary: DiaryEntry }) {
    return (
        <div>
            <h3 style={{marginBottom: '10px', marginTop: '20px'}}>{diary.date}</h3>
            <p style={{marginBlock: 0}}>{diary.visibility}</p>
            <p style={{marginBlock: 0}}>{diary.weather}</p>
        </div>
    )
}