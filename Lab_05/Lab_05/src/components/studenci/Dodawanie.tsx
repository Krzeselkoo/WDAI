import React, { useState } from 'react';

interface Student {
    name: string;
    surname: string;
    birthYear: number;
}

interface DodawanieProps {
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
}

function Dodawanie({ setStudents }: DodawanieProps) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [birthYear, setBirthYear] = useState('');

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault()
        setStudents(prevStudents => [
            ...prevStudents,
            { name, surname, birthYear: parseInt(birthYear) }
        ]);
        setName('');
        setSurname('');
        setBirthYear('');
    };

    return (
        <form onSubmit={handleAddStudent}>
            <h1>Dodawanie studenta</h1>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text" 
                placeholder="Imię" 
                required 
            />
            <input 
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text" 
                placeholder="Nazwisko" 
                required 
            />
            <input 
                value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                type="text" 
                placeholder="Rocznik" 
                pattern="[0-9]{4}" 
                required 
            />
            <button type="submit">Dodaj</button>
        </form>
    );
}

export default Dodawanie;