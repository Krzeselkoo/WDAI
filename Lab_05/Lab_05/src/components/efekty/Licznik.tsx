import { useState, useEffect } from 'react' 

function LicznikEffect(){
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
        console.log("Licznik zwiększył się do: " + count)
    }

    useEffect(() => {
        console.log("Hello world")
    })

    return(
        <>
            <div>
                <h1>Licznik: {count}</h1>
                <button onClick={increment}>Dodaj</button>
            </div>
        </>
    )
}

export default LicznikEffect