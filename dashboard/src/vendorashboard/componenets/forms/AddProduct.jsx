import React, {useState} from 'react'
import { API_PATH } from '../../data/ApiPath';

const AddProduct = () => {

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [bestseller, setBestSeller] = useState(false);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);


  const handleCategoryChange = (event) =>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item!==value));
    }else{
      setCategory([...category, value])
    }
  }

  const handleBestsellerChange = (event) =>{
    const value = event.target.value === 'true'
    setBestSeller(value)
  }

  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  const handleAddProductSubmit = async(e) =>{
    e.preventDefault()

    try {
      const loginToken = localStorage.getItem('loginToken');
      const firmId = localStorage.getItem('firmId');

      if(!loginToken || !firmId){
        console.log("User not authenticated")
      }

      const formData = new FormData();
      formData.append('productname', productName);
      formData.append('price', price);
      category.forEach((val)=>{
        formData.append('category', val)
      })
      formData.append('description', description);
      formData.append('image', file)

      const responce = await fetch(`${API_PATH}/product/add-product/${firmId}`, {
        method:'POST',
        body:formData
      })

      const data = await responce.json()

      if(responce.ok){
        alert("product added successfully")
      }

    } catch (error) {
      console.log(error)
    }


  }

  return (
    <div className="firmsection">
        <form className="tableForm" onSubmit={handleAddProductSubmit}>

            <h3>Add Product</h3>
        
            <label>Product Name</label>
            <input type="text" name='productname' value={productName} onChange={(e)=> setProductName(e.target.value)}/>

            <label>Price</label>
            <input type="text" name='price' value={price} onChange={(e)=>setPrice(e.target.value)}/>

            <label>Category</label>
            <div className="inputContainer">
              <div className="checkBoxContainer">
                <label>Veg</label>
                <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
              </div>
              <div className="checkBoxContainer">
                <label>Non-veg</label>
                <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
              </div>
            </div>

            <label>Best Seller</label>
            <div className="RadioContainerGroup">
              <div className="radioContainer">
                <label>Yes</label>
                <input type="radio" name="option" value="true" checked={bestseller === true} onChange={handleBestsellerChange}/>
              </div>
              <div className="radioContainer">
                <label>No</label>
                <input type="radio" name="option" value="false" checked={bestseller === false} onChange={handleBestsellerChange}/>
              </div>
            </div>
            
            <label>Description</label>
            <input type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)}/>

            <label>Image</label>
            <input type="file" onChange={handleImageUpload}/>

            <br />
        
        <div className="btnSubmit">
                <button type='submit'>Submit</button>
        </div>
        </form>
        
    </div>
  )
}

export default AddProduct