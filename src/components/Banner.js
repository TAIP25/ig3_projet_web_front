import '../styles/Banner.css'
import logo from '../assets/leaf.png'
import GlobalSnackbar from './GlobalSnackbar'

function Banner({ snackbar, setSnackbar }){
    return (
        <div className="ipwf-banner">
        <GlobalSnackbar snackbar={snackbar} setSnackbar={setSnackbar}/>
        <img src = {logo} alt="logo" className="ipwf-logo"/>
        <h1>My Idel Game App</h1>
        </div>
    )
}

export default Banner