import React from "react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import styles from '../../styles/general/searchForm.module.css';

const SearchForm = () => {
  const [search, setSearch] = useState("");
  // const navigate = useNavigate();

  const handleHeaderSearchFormSubmit = (e) => {
    e.preventDefault();
    // navigate(`/search?${search}`);
  };

  return (
    <form className={styles.search} onSubmit={handleHeaderSearchFormSubmit}>
      <label htmlFor={styles.searchInput}>Search Box</label>
      <input
        id={styles.searchInput}
        className={styles.searchInput}
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className={styles.searchBtn} type="submit">
        <BsSearch className={styles.searchBtnIcon} />
      </button>
    </form>
  );
};

export default SearchForm;
