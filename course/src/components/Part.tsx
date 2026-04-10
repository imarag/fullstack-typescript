import type { CoursePart } from "../types";

export default function Part({ coursePart }: { coursePart: CoursePart}) {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled case ${value}`);
    };
    switch (coursePart.kind) {
        case 'basic':
            return (
                <div>
                    <h3>{ coursePart.name }</h3>
                    <p>Total exercises: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                </div>
            );
        
        case 'group':
            return (
                <div>
                    <h3>{ coursePart.name }</h3>
                    <p>Total exercises: {coursePart.exerciseCount}</p>
                    <p>Group projects: {coursePart.groupProjectCount}</p>
                </div>
            );
        
        case 'background':
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>Exercises: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                    <p>Material: {coursePart.backgroundMaterial}</p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <h3>{coursePart.name}</h3>
                    <p>Exercises: {coursePart.exerciseCount}</p>
                    <p>Description: {coursePart.description}</p>
                    <p>Requirements: {coursePart.requirements.join(", ")}</p>
                </div>
            )
        default:
            return assertNever(coursePart)
    }
}