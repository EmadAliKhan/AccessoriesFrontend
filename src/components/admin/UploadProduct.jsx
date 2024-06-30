import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import Autocomplete from "@mui/joy/Autocomplete";
import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Api/api";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const UploadProduct = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [description, setDescription] = useState("");
  const [productId, setProductId] = useState("");
  const [stock, setStock] = useState("");

  const [image, setImage] = useState(null);
  const[isLoading,setIsLoading] = useState(false)
const  navigate = useNavigate()

  const productUpload = async (event) => {
    event.preventDefault();
    if (
      category === "" ||
      title === "" ||
      sellPrice === "" ||
      purchasePrice === ""||
      image === "" ||
      stock === ""
    ) {
      notifyError()
      // alert("Fill all the fields");
    } else {
      let productData = {
        category,
        title,
        sellPrice,
        purchasePrice,
        product_id: productId,
        stock,
        description,
        image,
      };
      console.log("FRONTEND LOG: ", productData);
      setIsLoading(true)   
      try {
        const response = await axios.post(`${BASE_URL}/Products`, productData, {
          headers: {
            "Content-Type": "multipart/form-data",
            },
            });
          notifySuccess()
          navigate('/adminPortal/UpdateProduct')
      } catch (error) {
        console.log(error);
        notifyError()
      }finally{
        setIsLoading(false)
        setCategory("")
        setSellPrice("")
        setPurchasePrice("")
        setProductId("")
        setTitle("")
        setStock("")
      }
      // alert("productUpload");
    }
  };

  const notifySuccess = () => toast.success('🦄 Your Product has Uploaded!', {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });;

    const notifyError = () => toast.error('🦄 Fill all the fields!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });;

  return (
    <div>
      <h1 className="d-flex justify-content-center mb-3 text-primary fw-bold">
        Upload Product
      </h1>
      <Card
        style={{
          maxWidth: 450,
          margin: "0 auto",
          padding: "10px 5px",
          border: "1px solid black",
        }}
      >
        <CardContent>
          <form>
            <Grid container spacing={1}>
              <Grid xs={12} item>
                
                <TextField
                  required
                  value={category}
                  label="Category"
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Enter Category"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid xs={12} item>
                <TextField
                  required
                  value={title}
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter productTitle"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={productId}
                  type="number"
                  label="productId"
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Enter productId"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
           
              <Grid xs={6} item>
                <TextField
                  required
                  value={stock}
                  type="number"
                  label="stock"
                  onChange={(e) => setStock(e.target.value)}
                  placeholder="Enter stock"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
           
              <Grid xs={6} item>
                <TextField
                  required
                  value={sellPrice}
                  label="sellPrice"
                  type="number"
                  onChange={(e) => setSellPrice(e.target.value)}
                  placeholder="Enter Price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  required
                  value={purchasePrice}
                  label="purchasePrice"
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Enter Price"
                  type="number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid xs={12} item>
                <TextField
                  required
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid
                xs={12}
                item
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button className="btn btn-primary px-5" onClick={productUpload} disabled={isLoading}>
                  {isLoading? <CircularProgress size={24} color="inherit" /> : "upload"}
                </button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
      <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
    </div>
  );
};

export default UploadProduct;
