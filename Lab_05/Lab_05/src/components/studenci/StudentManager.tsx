import { useState } from "react"
import Dodawanie from "./Dodawanie"

interface Student {
    name: string
    surname: string
    birthYear: number
}

function StudentManager(){
    const [students, setStudents] = useState<Student[]>([
        { name: "Ala", surname: "Arboczy", birthYear: 1940 },
        { name: "Bartłomiej", surname: "Gawroński", birthYear: 2002 }
    ])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rok urodzenia</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student: Student) => (
                        <tr key={student.name}>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.birthYear}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Dodawanie setStudents={setStudents}/>
        </>
    )
}

export default StudentManager