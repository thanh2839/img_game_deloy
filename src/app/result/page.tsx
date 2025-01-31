'use client';
import React, { useEffect, useState } from 'react';
import './styles.css'; // Giả sử CSS được lưu trong styles.css

const Result = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');

  // Sử dụng useEffect để lấy dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const savedName = localStorage.getItem('name');
    const savedAvatar = localStorage.getItem('avatar');
    
    if (savedName) {
      setName(savedName);
    }
    
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []); // Chạy một lần khi component được render lần đầu tiên

  return (
    <div className="container">
      <div className="result-card">
        <div className="header">
          <div className="museum-logo">
            <img src="/images/anhlogo.png" alt="Logo bảo tàng" />
          </div>
          <div className="museum-name">Bảo Tàng Dân Tộc Học Việt Nam</div>
        </div>

        <div className="new-year-wish">
          🎊 Chúc Mừng Năm Mới 2025! 🎊
        </div>
        <div className="player-name" id="player-name">
          <p>
            Mừng năm mới Quý Tỵ, Bảo tàng Dân tộc học xin gửi lời chúc tốt đẹp nhất đến{' '}
            <strong>{name}</strong>. Mong quý khách sẽ có một năm mới thật nhiều niềm vui và may mắn !!!
          </p>
        </div>

        <div className="rotating-gallery">
          <div className="rotating-item">
            <img src="/img/1.png" alt="Cây nêu" />
          </div>
          <div className="rotating-item">
            <img src="/img/2.png" alt="Đèn lồng" />
          </div>
          <div className="rotating-item">
            <img src="/img/3.png" alt="Hoa đào" />
          </div>
          <div className="rotating-item">
            <img src="/img/4.png" alt="Lì xì" />
          </div>
          <div className="rotating-item">
            <img src="/img/5.png" alt="Mặt nạ" />
          </div>
          <div className="rotating-item">
            <img src="/img/6.png" alt="Hạt dưa" />
          </div>
          <div className="rotating-item">
            <img src="/img/7.png" alt="Quýt" />
          </div>
          <div className="rotating-item">
            <img src="/img/8.png" alt="Pháo hoa" />
          </div>
        </div>

        <div className="player-avatar">
          {avatar ? (
            <img src={avatar} alt="Avatar người chơi" />
          ) : (
            <div>Không có avatar</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
