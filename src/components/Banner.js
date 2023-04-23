import '../styles/Banner.css'
import logo from '../assets/leaf.png'

function Banner(){
    return (
        <div className="ipwf-banner">
        <img src = {logo} alt="logo" className="ipwf-logo"/>
        <h1>My Idel Game App</h1>
        </div>
    )
}

export default Banner