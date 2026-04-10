import { useState, useEffect } from 'react'
import './App.css'
import type { DiaryEntry } from './types/diaries'
import DiaryList from './components/DiaryList'
import { getAll } from './services/diary'
import NewDiaryForm from './components/NewDiaryForm'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    getAll().then(data => setDiaries(data))
  }, [])

  return (
    <div>
      <NewDiaryForm setDiaries={setDiaries} />
      <DiaryList diaries={diaries} />
    </div>
  )
}

export default App
