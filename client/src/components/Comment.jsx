import { NavLink } from 'react-router-dom'

const Username="Roro68"
const date=new Date().toLocaleDateString()
const Comment = (props) => {
  return(
    <li className="flex justify-between  ">
    <div className="flex flex-col   ">
    <h5 className="text-blue-800 text-l font-bold  p-0 m-0">User{props.info.user_id}{""} says on {props.info.date}{""}</h5>
    <p className="text-justify italic text-sm pr-6 h-16 overflow-hidden ">
    "{props.info.content}{""}"
    </p>
    </div>
    </li>
    )

}

export default Comment
