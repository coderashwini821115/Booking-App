import { Link } from "react-router-dom"
import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
const Navbar = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/login');
  }
  const {user} = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to={'/'} style={{color: "inherit" , textDecoration:"none"}}>
        <span className="logo" >EaseYourBooking</span>
        </Link>
       {user? user.username:  (<div className="navItems">
       
          <button className="navButton"  onClick={handleClick}>Register</button>
          <button className="navButton" onClick={handleClick}>Login</button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar
