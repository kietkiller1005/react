

import axios from 'axios';
 export default async function getlistproduct()
{
    try {
        console.log("adw")
        const response = await axios.get('http://localhost/Android/v2/getlistproduct.php');
        
        return response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
        return null;
      }
}