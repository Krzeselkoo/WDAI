import { useState } from 'react';

function Logowanie() {
    const [login, setLogin] = useState<string>("");
    const [mainPass, setMainPass] = useState<string>("");
    const [secondaryPass, setSecondaryPass] = useState<string>("");
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

    const changeState = (newLogin: string, newMainPass: string, newSecondaryPass: string) => {
        if (newMainPass === "" || newSecondaryPass === "" || newLogin === "") {
            setButtonDisabled(true);
        } else if (newMainPass === newSecondaryPass) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(false);
        }
    };

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newLogin = e.target.value;
        setLogin(newLogin);
        changeState(newLogin, mainPass, secondaryPass);
    };

    const handleMainPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMainPass = e.target.value;
        setMainPass(newMainPass);
        changeState(login, newMainPass, secondaryPass);
    };

    const handleSecondaryPassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSecondaryPass = e.target.value;
        setSecondaryPass(newSecondaryPass);
        changeState(login, mainPass, newSecondaryPass);
    };

    const loginSucceded = () => {
        alert("Zalogowano poprawnie");
    };

    const loginFailed = () => {
        alert("Hasła nie są zgodne");
    };

    const handleButtonClick = () => {
        if (mainPass === secondaryPass) {
            loginSucceded();
        } else {
            loginFailed();
        }
    };

    return (
        <>
            <input
                id="login"
                placeholder="Podaj login"
                value={login}
                onChange={handleLoginChange}
            />
            <input
                id="main"
                placeholder="Podaj hasło"
                value={mainPass}
                onChange={handleMainPassChange}
            />
            <input
                id="secondary"
                placeholder="Powtórz hasło"
                value={secondaryPass}
                onChange={handleSecondaryPassChange}
            />
            <button
                id="login-button"
                onClick={handleButtonClick}
                disabled={buttonDisabled}
            >
                Zaloguj
            </button>
        </>
    );
}

export default Logowanie;