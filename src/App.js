import React,{useState} from 'react'
import logo from './logo.svg';
import './App.css';
import FormData from 'form-data'
import axios from 'axios'
function App() {


  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: new FormData()
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData
  } = values;


  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };




  const onFormSubmit = (event) => {
    event.preventDefault();
    return fetch(`/api`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="App">
      <div>
      <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <button
        type="submit"
        onClick={onFormSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Product
      </button>
      </form>
      </div>
    </div>
  );
}

export default App;
