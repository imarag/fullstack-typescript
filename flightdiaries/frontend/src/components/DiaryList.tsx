import type { DiaryEntry } from "../types/diaries"
import Diary from "./Diary"


export default function DiaryList({ diaries }: { diaries: DiaryEntry[] }) {
    return (
        <div>
            <h2>Diary entries</h2>
            <div>
                {
                    diaries.map(d => (
                        <Diary key={d.id} diary={d} />
                    ))
                }
            </div>
        </div>
    )
}