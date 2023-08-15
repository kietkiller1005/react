import clsx from "clsx";
import getlistproduct from "./getlistproduct"
import styles from './content.module.scss';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
 export default function Content(){
    const myjun=getlistproduct()

    getlistproduct()
    .then(data => {
      if (data !== null) {
        console.log(data)
      }
    });


    const [products, setProducts] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const productList = await getlistproduct();
        if (productList !== null) {
          setProducts(productList);
        }
      }
  
      fetchData();
    }, []);


console.log(products)
    return(
 <div className={clsx(styles.father)} >
        {typeof products=="object"&&products.map((product) => (
          <Link     onClick={
()=>localStorage.setItem('product', JSON.stringify(product))



          } to={`/product/${product.id}`} key={product.id} className={clsx(styles.link)}>
          <div key={product.id} className={clsx(styles.item)} >
            <img className={clsx(styles.image)} src={"http://localhost/Android/v2/"+product.image_url} alt={product.name}  />
            <h3>{product.name}</h3>
            
            <span className={styles.productPrice}>
  {parseInt(product.price).toLocaleString()} VND
</span>
            
          </div>
          </Link>
        ))}
      </div>


    )
}