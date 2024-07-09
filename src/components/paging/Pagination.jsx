import React, { useState, useEffect } from 'react';

const PageSize = 5; // 페이지당 항목 수
const data = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`); // 예제 데이터

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const startIndex = (currentPage - 1) * PageSize;
      const endIndex = startIndex + PageSize;
      setCurrentData(data.slice(startIndex, endIndex));
    };

    fetchData();
  }, [currentPage]);

  const totalPages = Math.ceil(data.length / PageSize);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <ul>
        {currentData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index} onClick={() => handlePageClick(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pagination;
