import React from 'react';
import axios from 'axios';

const SalesList = () => {
  const handleClick = () => {
    const year = 2024;
    const month = 7;

    axios.post('http://localhost:9000/api/go/sales', { year, month })
      .then(response => {
        console.log('데이터가 성공적으로 저장되었습니다:', response.data);
        // 추가적으로 필요한 작업을 수행할 수 있음
      })
      .catch(error => {
        console.error('데이터 저장 중 오류 발생:', error);
      });
  };

  return (
    <div>
      <button onClick={handleClick}>매출 데이터 저장</button>
    </div>
  );
};

export default SalesList;