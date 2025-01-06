import { useState } from 'react';

function Formularz() {
    const [text, setText] = useState<string>("");

    const changeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    }

    return (
        <>
            <input type="text" placeholder="wpisz tekst~" onChange={changeText} />
            <div>{text}</div>
        </>
    );
}

export default Formularz;