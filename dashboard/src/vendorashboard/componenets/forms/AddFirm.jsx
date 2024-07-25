import React,{useState} from 'react'
import { API_PATH } from '../../data/ApiPath';

const AddFirm = () => {

  const [firmname, setFirmName] = useState("");
  const [area, setArea] = useState("");
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState("");
  const [file, setFile] = useState(null)


  const handleCategoryChange = (event) =>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item) => item!==value));
    }else{
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (event) =>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item) => item!==value));
    }else{
      setRegion([...region, value])
    }
  }

  const handleImageUpload = (event) =>{
    const selectedImage = event.target.files[0]
    setFile(selectedImage)
  }

  const handleFirmSubmit = async(e) =>{
    e.preventDefault()
    // console.log(`${API_PATH}/firm/add-firm`)

    try {
      const loginToken = localStorage.getItem('loginToken');
      if(!loginToken){
        console.log("User not Athenticated")
      }
      
      const formData = new FormData();
      formData.append('firmname', firmname);
      formData.append('area', area);
      

      category.forEach((val)=>{
        formData.append('category', val)
      })

      region.forEach((val)=>{
        formData.append('region', val)
      })

      formData.append('offer', offer);

      formData.append('image', file)

      const responce = await fetch(`${API_PATH}/firm/add-firm`, {
        method:'POST',
        headers : {
          'token' : `${loginToken}`
        },
        body : formData
      });
      const data = await responce.json()
      if(responce.ok){
        console.log(data);
        alert("Firm added Successfully")
      }else if(data.message === 'vendor can only have one firm'){
        alert("only one firm can be added")
      }else{
        alert("failed to add firm")
      }

      console.log(data.firmId)
      localStorage.setItem('firmId',data.firmId)

      setFirmName("")
      setArea("")
      setCategory([])
      setOffer("")
      setRegion([])
      setFile(null)

    } catch (error) {
      console.log("failed add Firm")
    }
  }

  return (
    <div className="firmsection">
        <form className="tableForm" onSubmit={handleFirmSubmit}>

            <h3>Add Firm</h3>
        
            <label>Firm Name</label>
            <input type="text" name='firmname' value={firmname} onChange={(e)=>setFirmName(e.target.value)}/>

            <label>Area</label>
            <input type="text" name='area' value={area} onChange={(e)=>setArea(e.target.value)}/>

            {/* <label>Category</label>
            <input type="text" /> */}
            <div className="check-inp">
              <label >Categorey</label>
              <div className="inputsContainer">
                <div className="checkBoxContainer">
                  <label>Veg</label>
                  <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
                </div>
                <div className="checkBoxContainer">
                  <label>Non-Veg</label>
                  <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
                </div>
              </div>
                
            </div>

            {/* <label>Region</label>
            <input type="text" /> */}
            <div className="check-inp">
              <label >Region</label>
              <div className="inputsContainer">
                <div className="checkBoxContainer">
                  <label>South Indian</label>
                  <input type="checkbox" checked={region.includes('south-indian')} value="south-indian" onChange={handleRegionChange}/>
                </div>
                <div className="checkBoxContainer">
                  <label>North Indian</label>
                  <input type="checkbox" checked={region.includes('north-indian')} value="north-indian" onChange={handleRegionChange}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Chinese</label>
                  <input type="checkbox" checked={region.includes('chinese')} value="chinese" onChange={handleRegionChange}/>
                </div>
                <div className="checkBoxContainer">
                  <label>Bakery</label>
                  <input type="checkbox" checked={region.includes('bakery')} value="bakery" onChange={handleRegionChange}/>
                </div>
              </div>
                
            </div>

            <label>Offer</label>
            <input type="text" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/>

            <label>Image</label>
            <input type="file" onChange={handleImageUpload}/>

            <br />
        
        <div className="btnSubmit">
                <button type='submit'> Submit</button>
        </div>
        </form>
        
    </div>
  )
}

export default AddFirm