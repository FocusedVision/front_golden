"use client";

import React, { useState, useCallback } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { SearchBarProps } from "@/types/home";
import styles from "./search.module.css";

const Search: React.FC<SearchBarProps> = ({
  placeholder = "Search",
  onSearch,
  className = "",
}) => {
  const [query, setQuery] = useState("");

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSearch?.(query);
    },
    [query, onSearch],
  );

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchIcon}>
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleChange}
            className={styles.searchInput}
            aria-label="search"
          />
        </div>
      </form>
    </div>
  );
};

export default Search;
