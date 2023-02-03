import loupe from '../assets/loupe.png';
import { NavLink } from 'react-router-dom'
const Search = () => {
  return (
    <NavLink to="/filters" >
    <img src= {loupe} alt="loupe" className=" h-8" />

        </NavLink>
    )
}

export default Search

