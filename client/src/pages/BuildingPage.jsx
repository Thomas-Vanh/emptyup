import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import LogoutButton from "../components/LogoutButton";
import { v4 as uuidv4 } from "uuid";
import Megaphone from "../assets/Megaphone.svg";
import UploadLogo from "../components/UploadLogo";
import SearchButton from "../components/SearchButton";
import PostButton from "../components/PostButton";
import { NavLink, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import { faBuildingCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const BuildingPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [building, setBuilding] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    getBuilding();
  }, []);

  const getBuilding = async () => {
    try {
      const response = await axios.get(`/api/building/${id}`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const buildingData = response.data.data[0];
      console.log(buildingData);
      const date = new Date(buildingData.dateofpost);
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const dateofpost = date
        .toLocaleDateString("en-GB", options)
        .replace(/\//g, "/");

      const building_id = buildingData.id;
      const adress = buildingData.adress;
      const city = buildingData.city;
      const type = buildingData.type;
      const zipcode = buildingData.zipcode;
      const admin_id = buildingData.admin_id;
      const lat = buildingData.lat;
      const lon = buildingData.lon;
      const initial_image = buildingData.initial_image;
      setBuilding({
        building_id,
        adress,
        zipcode,
        city,
        type,
        dateofpost,
        admin_id,
        lat,
        lon,
        initial_image
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    req();
  }, []);

  const req = async () => {
    try {
      const response = await axios.get(`api/building/${id}/comments`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      console.log(response);
      const dat = response.data.data;
      console.log(dat)
      const newComments = dat.map((comment) => {
        const content = comment.content;
        const id = comment.id;
        const date = comment.date;
        const user_id=comment.user_id
        const building_id=comment.building_id
        return { id, content, building_id, user_id, date};
      });
      setComments(newComments);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = (id) => {
    axios
      .delete(`/building/${id}`)
      .then((response) => {
        console.log("comment deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = uuidv4();
    const content = newComment;
    const commentToAdd = { id, content };
    setComments((prevComments) => [...prevComments, commentToAdd]);
    setNewComment("");
    axios
      .post("/building/" + "/add", commentToAdd)
      .then((response) => {
        console.log("comment added");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="font-custom1  h-screen w-screen flex flex-col m-0 p-0">
      <div className="flex h-1/12 w-full box-border justify-between px-5 pt-5">
        <Logo />
        <LogoutButton />
      </div>
      <h3 className="h-1/6 m-1 uppercase text-black font-bold text-5xl flex items-center justify-center">
        SPACE TO UP
      </h3>

      <div className="h-4/6 flex box-border items-center justify-around rounded-[25px] ">
        <div className="divForBuildingAndComments  w-1/2 h-full flex  ">
          {building ? (
            <div className="divForBuildingAndInfo flex justify-around p-10 w-full items-center">
              <div className="divBuilding h-72 w-72 border flex  shadow overflow:hidden rounded-full truncate">
                <img
                  src={building.initial_image}
                  alt="building's img"
                  className="  origin-top font-Custom1 h-72 "
                />
              </div>
              <div className="divInfo flex flex-col">
                <p className="font-bold">City: {building.city}</p>
                <p>Zipcode: {building.zipcode}</p>
                <p>Address: {building.adress}</p>
                <p>Type: {building.type}</p>
                <p>Date: {building.dateofpost}</p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="w-1/2 h-full flex flex-col">
          <ul className=" shadow-inner h-4/6 box-border bg-slate-50 w-11/12  rounded-[25px] p-3 flex overflow-scroll flex-col items-start ">
            {comments.map((comment) => (
              <Comment info={comment} delete={deleteComment} key={comment.id} />
            ))}
          </ul>
          <form
            className="p-3 mt-4 flex justify-between box-border flex-col items-center border-dotted border-3 border border-black rounded-[25px] h-2/6 w-11/12"
            action="submit"
            onSubmit={handleSubmit}
          >
            <div className=" w-full box-border flex pb-2"></div>

            <div className="box-border shadow-inner w-11/12 h-3/5     ">
              <input
                className="  h-full w-full bg-slate-50 "
                type="text"
                value={newComment}
                placeholder="You can wrote your comment here!"
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      <div className="w-1/2 h-full flex flex-col">
      <ul className=" shadow-inner h-4/6 box-border bg-slate-50 w-11/12  rounded-[25px] p-3 flex overflow-scroll flex-col items-start ">
              {comments.map((comment) => (<Comment info={comment} key={comment.id}/>
              ))}
            </ul>
        <form className="p-3 mt-4 flex justify-between box-border flex-col items-center border-dotted border-3 border border-black rounded-[25px] h-2/6 w-11/12" action="submit" onSubmit={handleSubmit}>
          <div className=" w-full box-border flex pb-2">

            <PostButton type="submit" />
          </form>
        </div>
      </div>

      <footer className="h-1/12  pt-4 flex justify-center">
        <NavLink to="/upload" className=" ">
          <UploadLogo />
        </NavLink>
      </footer>
    </div>
  );
};

export default BuildingPage;
