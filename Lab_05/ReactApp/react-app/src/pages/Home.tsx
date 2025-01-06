import { Link, Outlet } from 'react-router-dom'
import './style.css'

function Home() {

  return (
    <>
      <h1>Welcome to homepage!</h1>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center"}}>
        <Link to="/blog" style={{width:"40%", height: "40px", marginBottom:"20px",borderRadius:"20px", color:"#111111", backgroundColor:"whitesmoke", display: "flex", justifyContent: "center", alignItems: "center",}}>Blog</Link>
        <Link to="/dodaj" style={{width:"40%", height: "40px", marginBottom:"20px",borderRadius:"20px", color:"#111111", backgroundColor:"whitesmoke", display: "flex", justifyContent: "center", alignItems: "center",}}>Dodaj</Link>
      </div>
      <Outlet />
    </>
  )
}

export default Home
