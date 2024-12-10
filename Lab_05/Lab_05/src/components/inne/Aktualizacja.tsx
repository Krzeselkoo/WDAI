function Aktualizacja(){
    
    let produkt = {nazwa : "Pomidor", cena: 50}

    return (
        <>
        <div>
            Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
        </div>
        <button 
        onClick={() => {
            produkt = {...produkt, cena: 100}
        }}>
            Zmień cenę</button>
        </>
    )
}

export default Aktualizacja