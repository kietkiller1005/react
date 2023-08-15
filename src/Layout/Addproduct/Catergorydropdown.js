import React, { useState } from 'react';
import './CategoryDropdown.css';

const CategoryDropdown = ({ value,categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(value?value:'');
if(value==='')
{
  console.log(1)
  
}

  const handleCategoryChange = (event) => {
    console.log(event)
    const category = event.target.value;
    
    setSelectedCategory(category);
    onSelectCategory(event);
  };
  
  return (
    <div className="category-dropdown">
     
      <select name="category" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
