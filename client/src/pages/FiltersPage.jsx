import Navigation from "../components/Navigation";
import UploadLogo from "../components/UploadLogo";
import { LeafletContainer } from "../maps/leaflet-container";
import { LeafletMap } from "../maps/leaflet-map";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Logo from "../components/Logo";
import RegisterButton from "../components/RegisterButton";
import LoginButton from "../components/LoginButton";
import Modal from "../components/Modal";
import LoginPicto from "../components/LoginPicto";
import FormLog from "../components/FormLog";
import FormReg from "../components/FormReg";

const FiltersPage = () => {
  const [modalActive, setModalActive] = useState(false);
  const [modalActive1, setModalActive1] = useState(false);
  const [modalActiveLog, setModalActiveLog] = useState(false);
  const [modalActiveLog1, setModalActiveLog1] = useState(false);
  const [modalActiveReg, setModalActiveReg] = useState(false);
  const [modalActiveReg1, setModalActiveReg1] = useState(false);
  const [input, setInput] = useState("Fill in the field needed for search");

  const onClickLog = () => {
    setModalActive(false);
    setModalActiveLog(true);
  };

  const onClickReg = () => {
    setModalActive(false);
    setModalActiveReg(true);
  };

  const onClickLog1 = () => {
    setModalActive1(false);
    setModalActiveLog1(true);
  };

  const onClickReg1 = () => {
    setModalActive1(false);
    setModalActiveReg1(true);
  };

  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getAllBuildings();
  }, []);

  const inputRefCity = useRef();
  const inputRefZipcode = useRef();
  const inputRefType = useRef();

  const getAllBuildings = async () => {
    try {
      const response = await axios.get("/api/building", {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const buildingsData = response.data.data;

      const buildingsAll = buildingsData.map((building) => {
        const dateofpost = building.dateofpost;
        const id = building.id;
        const adress = building.adress;
        const city = building.city;
        const type = building.type;
        const zipcode = building.zipcode;
        const admin_id = building.admin_id;
        const position = building.position;
        const lat = building.lat;
        const lon = building.lon;
        const initial_image = building.initial_image;
        return {
          id,
          adress,
          zipcode,
          city,
          type,
          dateofpost,
          admin_id,
          lat,
          lon,
          initial_image,
        };
      });
      setBuildings(buildingsAll);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = inputRefCity.current.value;
    const zipcode = inputRefZipcode.current.value;
    const type = inputRefType.current.value;

    try {
      if (city) {
        const response = await axios.get(`/api/building/city/${city}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredCity = response.data;
        setBuildings(buildingsFilteredCity);
        setInput(`Buildings in ${city}`);
        console.log(buildingsFilteredCity);
        document.getElementById("inputCity").value = "";
      }

      if (zipcode) {
        const response = await axios.get(`/api/building/zipcode/${zipcode}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredZipcode = response.data;
        setBuildings(buildingsFilteredZipcode);
        setInput(`Buildings in ${zipcode}`);
        console.log(buildingsFilteredZipcode);
        document.getElementById("inputZipcode").value = "";
      }

      if (type) {
        console.log(type);
        const response = await axios.get(`/api/building/type/${type}`, {
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        });
        const buildingsFilteredType = response.data;
        setBuildings(buildingsFilteredType);
        setInput(`${type}`);
        console.log(buildingsFilteredType);
        document.getElementById("inputType").value = "";
      }
    } catch (error) {
      console.log(error);
      setInput(`No spaces found`);
    }
  };

  return (
    <div className="font-custom1  h-screen w-screen flex flex-col m-0 p-0">
      <div className="flex flex-col items-center">
        <div className="flex h-1/10 w-full box-border justify-between p-5 ">
          <Logo />
          <form
            className="flex flex-col items-center p-2"
            style={{ width: "100vw" }}
            onSubmit={handleSubmit}
          >
            <div className="flex">
              <div>
                <label>
                  City:
                  <input
                    id="inputCity"
                    className="inputCity"
                    type="text"
                    placeholder="Enter your city"
                    ref={inputRefCity}
                  />
                </label>
              </div>
              <label>
                Zipcode:
                <input
                  id="inputZipcode"
                  type="text"
                  placeholder="Enter your zipcode"
                  ref={inputRefZipcode}
                />
              </label>
              <label>
                Type:
                <select ref={inputRefType} id="inputType">
                  <option value=""></option>
                  <option value="All">All</option>
                  <option value="Housing">Housing</option>
                  <option value="Gardens">Gardens</option>
                  <option value="Factories">Factories</option>
                  <option value="Offices">Offices</option>
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-800 text-white rounded-md p-1 mr-1 w-24 text-base font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
            >
              Search
            </button>
          </form>
          <LoginPicto setActive={setModalActive1} />
        </div>
        <div>{input}</div>
      </div>
      <div className=" h-5/6  ">
        <LeafletContainer>
          <LeafletMap buildings={buildings} />
        </LeafletContainer>
      </div>
      <footer className="h-1/12 flex justify-center">
        <UploadLogo setActive={setModalActive} className="cursor-pointer" />
        <Modal active={modalActive} setActive={setModalActive}>
          <p className="flex justify-center text-base">
            First, You need to register and login{" "}
          </p>
          <div className="flex justify-around">
            <LoginButton onClick={onClickLog} />
            <RegisterButton onClick={onClickReg} />
          </div>
        </Modal>

        <Modal active={modalActiveLog} setActive={setModalActiveLog}>
          <FormLog />
        </Modal>
        <Modal active={modalActiveReg} setActive={setModalActiveReg}>
          <FormReg
            onSubmit={(event) => {
              event.preventDefault();
              setModalActiveReg(false);
              setModalActiveLog(true);
            }}
          />
        </Modal>
      </footer>
    </div>
  );
};

export default FiltersPage;
