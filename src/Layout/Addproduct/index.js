import React, { useState } from 'react';
import styles from './addproduct.module.scss';
import clsx from 'clsx';
import { useRef,useEffect,useLayoutEffect } from 'react';
import CategoryDropdown from './Catergorydropdown';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProductForm = () => {

  async function checkvar() {
        
    if (localStorage.getItem('username')) {
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('password');
  console.log("dad")
      try {
        const response = await axios.get('http://localhost/Android/v2/superadminlogin.php', {
          params: {
            email: savedUsername,
            password: savedPassword,
          },
        });
  
        if (response.data.message === "Login success") {
         
          
          return true;
        }
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
        console.log("dad")
      return false;
    }
  }

  useLayoutEffect(() => {
    
    async function fetchData() {
      const isLoggedIn = await checkvar();
      if (isLoggedIn) {
        // Người dùng đã đăng nhập
      } else {
        navigate("/404")
      }
    }
  
    fetchData();

  }, []);

  const [product, setProduct] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '', 
  });
  const myRef = useRef(null);
  
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(event)
    setProduct({
      ...product,
      [name]: value,
    });
  
    
  };

  const handleImageChange = (file) => {
    if (file) {
        myRef.current=file
      const reader = new FileReader();
      reader.onload = (e) => {
        setProduct({
          ...product,
          image: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };
console.log(myRef.current)
  const handleAddProduct = () => {
    if (
      product.name &&
      product.category &&
      product.price &&
      product.description &&
      product.image
    ) {
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', myRef.current);
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('description', product.description);
      // Make an Axios POST request to upload the image
      axios.post('http://localhost/Android/v2/upload.php', formData)
        .then((response) => {
          // Handle success if needed
          const {image_url,success}=response.data
          console.log(success);
          if(success)
          {
            alert("Tạo sản phẩm thành công")
            setProduct({
              name: '',
              category: '',
              price: '',
              description: '',
              image: '',
            });



          }
         
        })
        .catch((error) => {
          // Handle error if needed
          console.error('Error uploading image:', error);
        });

      // Clear the form fields
      
    }
  };



  const handleAddProduct1 = (e) => {
    console.log(e)
      // Create a FormData object to send the image file
      const formData = new FormData();
      formData.append('image', e);

      // Make an Axios POST request to upload the image
      axios.post('http://localhost/Android/v2/upload.php', formData)
        .then((response) => {
          // Handle success if needed
          const {image_url,sucess}=response.data
          console.log(sucess);
        })
        .catch((error) => {
          // Handle error if needed
          console.error('Error uploading image:', error);
        });

      // Clear the form fields
      
    
  };



  const categories = ['Xe đạp', 'Đồ ăn vặt'];
  console.log(product)
  const handleCategorySelect=()=>{

  }
  return (
    <div className={styles['form-container']}>
      <div onClick={()=>{
        navigate('/')
      }} className={styles['back_button']}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </div>
<div className={clsx(styles.one_div)}>
<div className={styles['form-group']}>
        
        <label htmlFor="file-input" className="custom-file-input">
        <span className={clsx(styles.button_text)}></span>
      </label>
        <input
        id='file-input'
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e.target.files[0])}
          className={clsx(styles['form-input'],styles.image)}
        />
      </div>
      <div className={clsx(styles['form-group'],styles.group_image)}>
  <label className={styles['form-label']}>Selected Image:</label>
  <div className={styles['image-container']}>
    {product.image && (
      <img
        src={product.image}
        alt="Selected"
        className={styles['selected-image']}
      />
    )}
  </div>
</div>
</div>


        <div className={clsx(styles.two_div)}>

        
      <div className={styles['form-group']}>
        <label className={styles['form-label']}>Name:</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className={styles['form-input']}
        />
      </div>
      <div className={styles['form-group']}>
        <label className={styles['form-label']}>Category:</label>
        <CategoryDropdown value ={product.category} categories={categories} onSelectCategory={handleInputChange} />
        
      </div>
      <div className={styles['form-group']}>
        <label className={styles['form-label']}>Price:</label>
        <input
          type="text"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className={styles['form-input']}
        />
      </div>
      <div className={styles['form-group']}>
        <label className={styles['form-label']}>Description:</label>
        <textarea
          name="description"
          value={product.description}
          
          onChange={handleInputChange}
          className={styles['form-input']}
        />
      </div>
      
      

      <button className={styles['form-button']} onClick={handleAddProduct}>
        Add Product
      </button>
    </div>
    </div>
  );
};

export default AddProductForm;
