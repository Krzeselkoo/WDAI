interface Student {
    name: string
    surname: string
    birthYear: number
}

function Studenci(){
    const students: Student[] = [
        { name: "Jan", surname: "Kowalski", birthYear: 1990 },
        { name: "Anna", surname: "Nowak", birthYear: 1992 }
    ]

    return (
        <table>
            <thead>
                <tr>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Rok urodzenia</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.name}>
                        <td>{student.name}</td>
                        <td>{student.surname}</td>
                        <td>{student.birthYear}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Studenci
