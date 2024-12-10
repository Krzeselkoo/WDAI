import './App.css'
import Koszyk from './components/koszyk/Koszyk.tsx'
import NowyKoszyk from './components/koszyk/NowyKoszyk.tsx'
import Licznik from './components/licznik/Licznik.tsx'
import NowyLicznik from './components/licznik/NowyLicznik.tsx'
import Formularz from './components/formularze/Formularz.tsx'
import Haslo from './components/formularze/Haslo.tsx'
import Logowanie from './components/formularze/Logowanie.tsx'
import Ternary from './components/inne/Ternary.tsx'

function App() {

  return (
    <>
      <Koszyk/>
      <NowyKoszyk/>
      <Licznik/>
      <NowyLicznik/>
      <Formularz/>
      <Haslo/>
      <Logowanie/>
      <Ternary/>
    </>
  )
}

export default App
