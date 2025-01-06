import './App.css'
import Koszyk from './components/koszyk/Koszyk.tsx'
import NowyKoszyk from './components/koszyk/NowyKoszyk.tsx'
import Licznik from './components/licznik/Licznik.tsx'
import NowyLicznik from './components/licznik/NowyLicznik.tsx'
import Formularz from './components/formularze/Formularz.tsx'
import Haslo from './components/formularze/Haslo.tsx'
import Logowanie from './components/formularze/Logowanie.tsx'
import Ternary from './components/inne/Ternary.tsx'
import Aktualizacja from './components/inne/Aktualizacja.tsx'
import StudentManager from './components/studenci/StudentManager.tsx'
import LicznikEffect from './components/efekty/Licznik.tsx'
import Tytul from './components/efekty/Tytul.tsx'
import Odliczanie from './components/efekty/Odliczanie.tsx'
import Komentarz from './components/produkty/Komentarz.tsx'
import Komentarze from './components/produkty/Komentarze.tsx'

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
      <Aktualizacja/>
      <StudentManager/>
      <LicznikEffect/>
      <Tytul/>
      <Odliczanie/>
      <Komentarz
        id={1}
        body="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi facere ea earum suscipit, officiis possimus aliquid ab consequatur fugit, explicabo quibusdam? Ullam fugit sit dignissimos velit animi nihil voluptatibus quasi."
        postId={1}
        likes={10}
        user={{ id: 1, username: "Jan", fullName: "Jan Kowalski" }}
      />
      <Komentarze/>
    </>
  )
}

export default App
