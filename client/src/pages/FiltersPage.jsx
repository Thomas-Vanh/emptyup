import Navigation from "../components/Navigation";
import UploadLogo from "../components/UploadLogo";
import { LeafletContainer } from "../maps/leaflet-container";
import { LeafletMap } from "../maps/leaflet-map";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const FiltersPage = () => {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    getAllBuildings();
  }, []);

  // useEffect(() => {
  //   console.log(buildings);
  // }, [buildings]);

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
      // console.log(buildings)
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const city = inputRefCity.current.value;
    const zipcode = inputRefZipcode.current.value;
    const type = inputRefType.current.value;

    const data = {
      zipcode: inputRefZipcode.current.value
    }

    try {
      const response = await axios.get("/api/building/buildingby", data, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });

      const buildingsDataFiltered = response;
      console.log(buildingsDataFiltered)
     
      const buildingsFilt = buildingsDataFiltered.map((buildingFilt) => {
        const dateofpost = buildingFilt.dateofpost;
        const id = buildingFilt.id;
        const adress = buildingFilt.adress;
        const city = buildingFilt.city;
        const type = buildingFilt.type;
        const zipcode = buildingFilt.zipcode;
        const admin_id = buildingFilt.admin_id;
        const lat = buildingFilt.lat;
        const lon = buildingFilt.lon;
        const initial_image = buildingFilt.initial_image;
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
      setBuildings(buildingsFilt);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-custom1  h-screen w-screen flex flex-col m-0 p-0">
      <form
        className="flex flex-col"
        style={{ width: "30vw" }}
        onSubmit={handleSubmit}
      >
        <label>
          City:
          <input type="text" placeholder="Enter your city" ref={inputRefCity} />
        </label>
        <label>
          Zipcode:
          <input
            type="text"
            placeholder="Enter your zipcode"
            ref={inputRefZipcode}
          />
        </label>
        <label>
          Type:
          <select ref={inputRefType}>
            <option value="All">All</option>
            <option value="Housing">Housing</option>
            <option value="Gardens">Gardens</option>
            <option value="Factories">Factories</option>
            <option value="Offices">Offices</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-800 text-white rounded-md p-1 mr-1 w-24 text-base font-medium hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
        >
          Search
        </button>
      </form>
      <div className=" h-5/6  ">
        <LeafletContainer>
          <LeafletMap buildings={buildings} />
        </LeafletContainer>
      </div>
    </div>
  );
};

export default FiltersPage;
