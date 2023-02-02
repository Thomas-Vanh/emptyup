import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from 'react-router-dom'
import UploadLogo from "../components/UploadLogo";
import Building from "../components/Building"
import LogoutButton from "../components/LogoutButton"
import uploadpicto from "../assets/uploadpicto.png"
import Logo from "../components/Logo"

const UploadedPage =() => {

  const [buildings, setBuildings] = useState([]);
  const [showPicture, setshowPicture] = useState("");

  useEffect(() => {
    req();
  }, [])

const req = async () => {
  try {
    const response = await axios.get("api/user/profile", {
            headers: {
            "ngrok-skip-browser-warning": "69420"
            }
          });
    console.log (response)
    const dat = response.data.data
    const newPicture =  {
     content : dat.profilpicture_url,
      id : dat.id,
      username : dat.username,
      admin_id:dat.admin_id
      };
   setshowPicture(newPicture)

    }

  catch (error) {
  console.log(error);
  }
}




  useEffect(() => {
  getBuildingsUploaded();
  }, [])

  const getBuildingsUploaded = async () => {
    try {
      const user_id=await showPicture.id
      console.log(user_id)
      const response = await axios.get('/api/building/admin+id', {
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      });
      const data = response.data.data;
      console.log(data)
      const BuildingsUploaded = data.map(building => {
        const dateofpost = building.dateofpost;
        const id = building.id;
        const adress = building.adress;
        const city = building.city;
        const type = building.type;
        const zipcode = building.zipcode;
        const admin_id = building.admin_id;
        const image=building.initial_image
        return { id, adress, zipcode, city, type, dateofpost, admin_id, image};
      });
      setBuildings(BuildingsUploaded);
    }
    catch (error) {
      console.log(error);
    }
  }

  const deleteBuilding= (id) => {
    axios.delete('/api/building/delete/'+id)
    .then(response => {
    console.log("building deleted")
    })
    .catch(error => {
    console.log(error);
    });
    setBuildings(buildings.filter((building) => building.id !== id))
  }
 const content=showPicture.content
  console.log(content)

  return(
<div className="h-screen font-custom1  w-screen flex flex-col box-border ">
        <div className="flex h-1/12 w-full box-border justify-between px-5 pt-5 ">
          <Logo/>
          <LogoutButton url={content} />
</div>


		  <h3 className="h-1/6 uppercase text-black font-bold text-5xl flex items-center justify-center">
			My Uploaded
         <img src={uploadpicto} alt="upload" className="flex box-border" style={{ height: '50px', marginLeft :'20px',marginTop :'2px'}}/>

      </h3>

			<div className="h-4/6 mx-2 flex flex-col box-border items-center rounded-[25px]">
        <ul className=" shadow-inner h-full box-border bg-slate-50  w-11/12  rounded-[25px] p-3 flex overflow-scroll  flex-col  items-start ">
            {
              buildings.map((building) => {
                return <Building info={building} delete={deleteBuilding} key={building.id}/>
              })
            }
        </ul>
      </div>

		  <footer className="h-1/12  pt-4 flex justify-center">
          <NavLink to="/upload" className=" ">
            <UploadLogo />
          </NavLink>
        </footer>


		</div>
	)
}

export default UploadedPage
