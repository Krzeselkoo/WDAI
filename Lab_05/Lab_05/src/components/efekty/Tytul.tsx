import { useEffect, useState } from "react"

export default function Tytul() {
    const [input, setInput] = useState("");
    useEffect(() => {
        document.title = input || "Wpisz tytuł"
    },[input])

    return (
        <>
            <input 
                id="title" 
                type="text" 
                placeholder="Wpisz tytuł" 
                value={input} 
                onChange={ (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
            />
        </>
    )
}