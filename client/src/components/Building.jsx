import { NavLink } from 'react-router-dom'
import Picture from "../components/Picture"


const Building = (props) => {
  return(
    <li className="flex justify-between  ">
    <button className="text-2xl text-blue-800 pr-2 mb-3 w-5" onClick={()=>props.delete(props.info.id)} > x
    </button>


    <div className="flex flex-col justify-between h-100  ">
    <h5 className="text-blue-800 text-xl font-bold capitalize">{props.info.adress} {props.info.zipcode} {props.info.city}{""}</h5>
    <p className="text-justify  text-sm pr-6   ">
    {props.info.type}{""}
    </p>
    <p className="text-justify text-sm pr-6  ">
    Created on {props.info.dateofpost}{""}
    </p>

    </div>

    </li>
    )
}

export default Building
