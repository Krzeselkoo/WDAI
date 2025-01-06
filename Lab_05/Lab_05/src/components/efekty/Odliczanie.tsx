import { useEffect, useState } from "react";

export default function Odliczanie() {
    const [time, setTime] = useState(150);
    const [running, setRunning] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>("Start");
    useEffect(() => {
        if(time === 0) {
            setButtonDisabled(true);
            setButtonText("Odliczanie zakończone")
        }
        if (running && time > 0) {
            const interval = setInterval(() => setTime(time - 1), 100);
            return () => clearInterval(interval);
        }
        
    }, [time, running]);

    return (
        <>
        <h2>{time/10}</h2>
        <button 
            onClick={!running ? () => {setRunning(true); setButtonText("Stop")} : () => {setRunning(false); setButtonText("Start")}}
            disabled={buttonDisabled}
        >{buttonText}</button>
        </>
    )


}