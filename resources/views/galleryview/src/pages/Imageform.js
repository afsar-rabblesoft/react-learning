import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios, {isCancel, AxiosError} from 'axios';
import ImageCard from './ImageCard';
import 'bootstrap/dist/css/bootstrap.css';
import { Counter } from './Counter';

const token = localStorage.getItem('token')

function BasicExample() {
  const [count, setCount] = useState(0);

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [items, setItems] = useState([])
    const token=localStorage.getItem('token')
    
  const fetchData = () => {
    axios.get("http://localhost:8000/api/image",{headers: {
  
      "Authorization": `Bearer ${token}`
      }   
  })
      .then(response => {
        console.log(response);
        setItems(response.data)
      })    
  }
  useEffect(() => {
    fetchData()
  }, [])
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });
    console.log(image[0])
    
    let handleSubmit = async (e) => {

        e.preventDefault();

        try {
            axios.post('http://localhost:8000/api/image', {
                title: title,
                image:image[0],
              }, { headers: {
                'Content-Type': 'multipart/form-data',
                 "Authorization": `Bearer ${token}`

            }})
              .then(function (response) {
                console.log(response);
                if (response.status === 200) {
                    setTitle("");
                    setImage("");
                    setMessage("Image Uploaded successfully");
                    console.log(response.data);
                    setItems([...items ,response.data])
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

const filterItem = (id) => {
    const filteredItems = items.filter((value) => {
    
        return value.id !== id
    })
    setMessage("Image Deleted successfully");

    setItems([...filteredItems]);
}
      
  return (
    <div className="App">
            <img src={image} />

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
    
        <input
          type="file"
        
          placeholder="Images"
          onChange={(e) => setImage(e.target.files)}
        />

        <button type="submit">Submit</button>

      </form>
      {items && items.map(item => ( 
    <ImageCard gallery={{ title: item.title, image: item.image ,imageid : item.id} } filterItem={filterItem}/>
    ))} 
       <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
    </div>
  );
}

export default BasicExample;