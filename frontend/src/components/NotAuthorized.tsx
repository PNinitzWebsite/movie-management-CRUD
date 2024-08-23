import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();

  const goToUserSelection = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>NotAuthorized - ไม่ได้รับอนุญาต</h1>
      <p>กรุณาเลือก User ที่มียศสูงกว่านี้เพื่อเข้าถึงหน้าที่ต้องการ</p>
      <button onClick={goToUserSelection}>กลับไปเลือก User</button>
    </div>
  );
};

export default NotAuthorized;
