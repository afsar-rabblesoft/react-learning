import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import axios, { isCancel, AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css';


function ImageCard({ gallery, filterItem }) {
  const [imageid, setImageid] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('token')
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.delete('http://localhost:8000/api/image/' + gallery.imageid, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
        .then(function (response) {
          if (response) {
            console.log(response);
            setMessage("Image Deleted successfully");
            filterItem(gallery.imageid)
          } else {
            setMessage("Some error occured");
          }
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Col className="mb-2">

      <p>{gallery.title}</p>
      <img variant="top" src={gallery.image} className='img-thumbnail' height={100} width={100} />
      {/* <form onSubmit={handleSubmit}> */}

      <button onClick={handleSubmit}  >X</button>
      <div className="message">{message ? <p>{message}</p> : null}</div>

      {/* </form> */}

    </Col>

  );
}

export default ImageCard;