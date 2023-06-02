import React, {useState} from 'react';
import styles from '../../styles/general/navbar.module.css';

const Navbar = () => {  
  const [categories, setCategories] = useState([{id:1, name:'Men', address:"#"}, {id:2, name:'Women', address:"#"}, {id:3, name:'Kids', address:"#"}, {id:4, name:'Beauty & Grooming', address:"#"}, {id:5, name:'Home', address:"#"}, {id:6, name:'Watches & Jewellery', address:"#"}, {id:7, name:'Eyewear', address:"#"}]);

  return (
    <div className={styles.navbar}>
      {
        categories.map((category) => <a href={category.address} key={category.id}>{category.name}</a>)
      }
    </div>
  )
}

export default Navbar