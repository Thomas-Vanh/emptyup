import { NavLink } from 'react-router-dom'
import Picture from "../components/Picture"

const Annoucement = (props) => {
	return(
		<li className="flex justify-between  ">
		<button className="text-2xl text-blue-800 pr-2 mb-3 w-5" onClick={()=>props.delete(props.info.id)} > x
		</button>

		<NavLink to="/annoucement" className="flex">
		<div className=" h-24 w-24 truncate overflow: hidden; rounded-full" >
       <img src= {props.info.profilePicture} alt="profile picture" className="scale-125 origin-top " />
        </div>
		<div className="flex flex-col   ">
		<h5 className="text-blue-800 text-xl font-bold capitalize p-0 m-0">{props.info.subject}{""}</h5>
		<h5 className="text-blue-800 p-0 m-0">{props.info.username} wrote on {props.info.date} :</h5>
		<p className="text-justify italic text-sm pr-6 h-16 overflow-hidden ">
		"{props.info.content}{""}"
		</p>
		</div>
		</NavLink> 
		</li>
		)
}

export default Annoucement
