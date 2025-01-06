import { useState } from 'react';

function Aktualizacja() {
    const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

    return (
        <>
            <div>
                Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
            </div>
            <button 
                onClick={() => {
                    setProdukt(prevProdukt => ({ ...prevProdukt, cena: 100 }));
                }}>
                Zmień cenę
            </button>
        </>
    );
}

export default Aktualizacja;