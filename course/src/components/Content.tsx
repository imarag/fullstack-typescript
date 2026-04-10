import Part from "./Part"
import type { CoursePart } from "../types"

interface ContentProps {
    courseParts: CoursePart[]
}

export default function Content({ courseParts }: ContentProps) {
    return (
        <div>
            {
                courseParts.map(part => (
                    <Part coursePart={part} />
                ))
            }
        </div>
    )
}