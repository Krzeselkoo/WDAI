import Produkt from './Produkt'

function NowyKoszyk(){
    const Produkty = ["Jabłko", "Pomarańcza", "Wino i grono", "Pomelo", "Banan"]
    return (
       <>   
            <h1>Koszyk</h1>
            {Produkty.map(produkt =>(<Produkt name={produkt}/>)) }
       </> 
    )
}

export default NowyKoszyk