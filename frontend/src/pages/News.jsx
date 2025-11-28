import { useEffect, useState } from 'react';
import axios from 'axios';

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Tin mẫu hiển thị khi không có dữ liệu từ backend
  const sampleNews = [
    {
      _id: 'sample1',
      title: 'QAirline khai trương đường bay mới đến Tokyo',
      content: 'Từ tháng 7, QAirline sẽ chính thức khai thác đường bay thẳng đến Tokyo mỗi ngày.',
      type: 'news',
      publishedAt: new Date(),
    },
    {
      _id: 'sample2',
      title: 'Khuyến mãi hè: Giảm giá 30% tất cả các chuyến bay',
      content: 'Đặt vé từ nay đến hết tháng 6 để nhận ưu đãi giảm giá lớn nhất mùa hè!',
      type: 'promotion',
      publishedAt: new Date(),
    },
    {
      _id: 'sample3',
      title: 'Thông báo thay đổi giờ bay do thời tiết',
      content: 'Một số chuyến bay bị ảnh hưởng bởi thời tiết xấu tại khu vực miền Trung.',
      type: 'announcement',
      publishedAt: new Date(),
    },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('/api/news');
        console.log("Dữ liệu nhận được từ API:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setNewsList(response.data);
        } else {
          setNewsList([]); // Không dùng sample ở đây, dùng ở phần render
        }
      } catch (err) {
        setError('Không thể tải tin tức');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const renderNewsList = (list) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {list.map((news) => (
        <div
          key={news._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '1rem',
            backgroundColor: '#f9f9f9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
          }}
        >
          <h3 style={{ marginBottom: '0.5rem', color: '#333' }}>{news.title}</h3>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
            <strong>Loại:</strong> {news.type}
          </p>
          <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
            <strong>Ngày đăng:</strong> {new Date(news.publishedAt).toLocaleDateString()}
          </p>
          <p style={{ marginTop: '0.75rem', fontSize: '1rem', color: '#444' }}>{news.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Tin tức QAirline</h1>
      <p style={{ marginBottom: '1.5rem' }}>Danh sách tin tức về hãng bay, khuyến mãi, sự kiện...</p>

      {loading && <p>Đang tải tin tức...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && newsList.length > 0 && renderNewsList(newsList)}

      {!loading && !error && newsList.length === 0 && (
        <>
          {/* <p>Hiện chưa có tin tức nào được đăng. Dưới đây là một số ví dụ:</p> */}
          {renderNewsList(sampleNews)}
        </>
      )}
    </div>
  );
}
