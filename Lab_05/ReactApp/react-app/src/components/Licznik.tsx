import { useEffect, useState } from "react"

export default function Licznik() {
    const getInitialCount = () => {
        const savedCount = localStorage.getItem("count");
        return savedCount ? parseInt(savedCount, 10) : 0;
    };
    
    const [count, setCount] = useState(getInitialCount);
    
    useEffect(() => {
        localStorage.setItem("count", count.toString())
    }, [count]);


    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Button
            </button>
        </div>
    )
}