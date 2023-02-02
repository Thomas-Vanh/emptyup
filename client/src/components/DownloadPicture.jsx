import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const DownloadPicture = ({ submit}) => {

  const [image, setImage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault()


    const formData = new FormData();
    formData.append("image", image);

    axios
      .post("/api/user/profilepicture", formData)
      .then((response) => {
        console.log("photo uploaded");
        setImage(formData)
      })
      .catch((error) => {
        console.log(error);
      });

  };
  return (

      <Form
        onSubmit={onSubmit}
        className="h-full w-full flex flex-col items-center justify-center"
      >
        <h2 className="text-xl">Download a profile picture: </h2>
        <Form.Group className="flex justify-center " controlId="image">
          <Form.Control
            type="file"
           onChange={(event) => {
              if (event.target.files && event.target.files[0]) {
                setImage(event.target.files[0]);
                console.log(event.target.files[0]);
                //URL.createObjectURL(event.target.files[0])
              }
            }}
            />
            </Form.Group>
        <Button className="text-7xl" type="submit">+</Button>
      </Form>

  );
};
export default DownloadPicture;

