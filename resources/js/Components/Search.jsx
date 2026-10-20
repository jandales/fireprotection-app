import React, { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import CIcon from '@coreui/icons-react';
import { cilSearch, cilX } from '@coreui/icons';

const getPlaceholder = (url) => {
  if (url.includes('notification')) return 'Search notifications...';
  if (url.includes('device')) return 'Search devices...';
  if (url.includes('employee')) return 'Search employees...';
  if (url.includes('user')) return 'Search users...';
  return 'Search...';
};

const Search = ({ route: routeUrl, filter, placeholder }) => {
  const [search, setSearch] = useState(filter || '');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearch(filter || '');
  }, [filter]);

  const submitSearch = (event) => {
    event.preventDefault();
    const query = search.trim() ? { search: search.trim() } : {};
    router.get(routeUrl, query, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  const clearSearch = () => {
    setSearch('');
    router.get(routeUrl, {}, {
      preserveScroll: true,
      preserveState: true,
      replace: true,
      onStart: () => setIsLoading(true),
      onFinish: () => setIsLoading(false),
    });
  };

  return (
    <form className="table-search-toolbar" role="search" onSubmit={submitSearch}>
      <label className="table-search-field">
        <CIcon icon={cilSearch} aria-hidden="true" />
        <input
          type="search"
          placeholder={placeholder || getPlaceholder(routeUrl)}
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          aria-label={placeholder || getPlaceholder(routeUrl)}
        />
      </label>
      <button className="table-search-submit" type="submit" disabled={isLoading}>
        Search
      </button>
      {search && (
        <button
          className="table-search-clear"
          type="button"
          onClick={clearSearch}
          disabled={isLoading}
          aria-label="Clear search"
        >
          <CIcon icon={cilX} aria-hidden="true" />
          <span>Clear</span>
        </button>
      )}
    </form>
  );
};

export default Search;
