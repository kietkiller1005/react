
import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState } from 'react';
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './producvtdetail.module.scss';
import CategoryDropdown from "../Addproduct/Catergorydropdown";
export default function Productdetail(){
  


  const categories = ['Xe đạp', 'Đồ ăn vặt'];
    const [isAdmin, setIsAdmin] = useState(false);
    async function checkvar() {
        if (localStorage.getItem('username')) {
          const savedUsername = localStorage.getItem('username');
          const savedPassword = localStorage.getItem('password');
      
          try {
            const response = await axios.get('http://localhost/Android/v2/superadminlogin.php', {
              params: {
                email: savedUsername,
                password: savedPassword,
              },
            });
      
            if (response.data.message === "Login success") {
              
              setIsAdmin(true);
            }
          } catch (error) {
            console.error(error);
            setIsAdmin(false);
          }
        } 
      }


      
     
    const navigate=useNavigate();
    const [productDetail, setProductDetail] = useState(null);

    useEffect(() => {
      const product = JSON.parse(localStorage.getItem('product'));
      setProductDetail(product);
      checkvar()
    }, []);
    

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      
      setProductDetail({
        ...productDetail,
        [name]: value,
      });
    
      
    };
console.log(productDetail)
const handleDelete = async () => {

  try {

    const choice = window.confirm("Bạn muốn xóa sản phẩm này ?")
    if (choice == false) {
      return
  } 
    const formData = new FormData();
      formData.append('id', productDetail.id);
    const response = await axios.post('http://localhost/Android/v2/deleteproduct.php', formData);

    if (response.data.success) {
      console.log("Xoa thanh cong")
      navigate("/")
    } else {
      console.log("Xoa thât bai")
    }
  } catch (error) {
    console.error('Lỗi khi xóa sản phẩm:', error);
    console.log("Xoa thât bai")
  }
};
    const handleEdit = () => {
      // Gửi yêu cầu sửa sản phẩm đến server
      const formData = new FormData();
      formData.append('id', productDetail.id);
      formData.append('name', productDetail.name);
      formData.append('category', productDetail.category);
      formData.append('price', productDetail.price);
      formData.append('description', productDetail.description);
      axios.post('http://localhost/Android/v2/editproduct.php',formData)
      .then(response => {
          console.log(response.data);
          // Xử lý thành công, điều hướng hoặc hiển thị thông báo tùy ý
      })
      .catch(error => {
          console.error(error);
          // Xử lý lỗi nếu có
      });
  };

return(

<div className={styles['form-container']}>
      <div onClick={()=>{
        navigate('/')
      }} className={styles['back_button']}>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
      </div>
<div className={clsx(styles.one_div)}>

      <div className={clsx(styles['form-group'],styles.group_image)}>
  <label className={styles['form-label']}>Ảnh Sản Phẩm :</label>
  <div className={styles['image-container']}>
    {productDetail && productDetail.image_url  && (
      <img
        src={"http://localhost/Android/v2/"+ productDetail.image_url}
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
        {isAdmin?(
          <input
          type="text"
          name="name"
          value={productDetail.name}
          onChange={handleInputChange}
          className={styles['form-input']}
        />
        ):(<span>
          {productDetail ? productDetail.name : ''}
          </span>)}
        
      </div>
      { isAdmin?(<div className={styles['form-group']}>
        <label className={styles['form-label']}>Category:</label>
        <CategoryDropdown value ={productDetail.category} categories={categories} onSelectCategory={handleInputChange} />
        
      </div>)

      :''}
      <div className={styles['form-group']}>
        <label className={styles['form-label']}>Price:</label>
        

        {isAdmin?(
          <input
          type="text"
          name="price"
          value={productDetail.price}
          onChange={handleInputChange}
          className={styles['form-input']}
        />
        ):(<span className={
          clsx(styles.price)
      }>
      {productDetail ? parseInt(productDetail.price).toLocaleString() : ''}  VND
      </span>)}
      </div>
      <div className={styles['form-group','form-group-dev']}>
        <label className={styles['form-label',"form-dev"]}>Description:
        { !isAdmin? (
        <Fragment>
        <br />
        <br />
        
        <span>
        {productDetail ? productDetail.description : ''}
        </span>
        </Fragment>
        ):""}
        </label>
        {
            isAdmin?(
                <textarea
                name="description"
                value={productDetail.description}
                
                onChange={handleInputChange}
                className={styles['form-input','input-dec']}
              />
            ):""
        }
        
       
      </div>
 {isAdmin?(
 <div className={styles['button-container']}>
 <button onClick={handleEdit} className={styles['form-button']} >
        Edit Product
      </button>

      <button onClick={handleDelete} className={` ${styles['delete-button']}`} >
        Delete
      </button>
      </div>
      
      ):""}
      
      
      

      
    </div>
    </div>
















)


}