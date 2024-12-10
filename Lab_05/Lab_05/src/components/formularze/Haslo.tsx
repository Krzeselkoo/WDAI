import { useState } from 'react';

function Haslo() {
    const [text, setText] = useState<string>("Proszę wprowadzić hasło");

    const changeText = () => {
        const mainPass = (document.getElementById("main") as HTMLInputElement).value;
        const secondaryPass = (document.getElementById("secondary") as HTMLInputElement).value;

        if (mainPass === "" && secondaryPass === "") {
            setText("Proszę wprowadzić hasło");
        } else if (mainPass === secondaryPass) {
            setText("");
        } else {
            setText("Hasła są różne");
        }
    };


    return (
        <>
            <input
                id="main"
                placeholder="Podaj hasło"
                onChange={changeText}
            />
            <input
                id="secondary"
                placeholder="Powtórz hasło"
                onChange={changeText}
            />
            <div>{text}</div>
        </>
    );
}

export default Haslo;