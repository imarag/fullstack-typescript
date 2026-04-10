import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../types/diaries'

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async () => {
    const res = await axios.get<DiaryEntry[]>(baseUrl)
    return res.data
}

const addOne = async (newDiaryEntry: NewDiaryEntry) => {
    const res = await axios.post<DiaryEntry>(baseUrl, newDiaryEntry)
    return res.data
}

export {
    getAll, addOne
}