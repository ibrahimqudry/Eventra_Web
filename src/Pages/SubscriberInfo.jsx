import { useParams } from "react-router-dom";
import "../css/qr.css"; 

const SubscriberInfo = () => {
  const { id } = useParams();

  const subscribers = {
    "123": { name: "منة المصري", age: 25, job: "مهندسة برمجيات", bookingDate: "2025-03-25" },
    "456": { name: "أحمد علي", age: 30, job: "مصمم جرافيك", bookingDate: "2025-04-10" },
    "789": { name: "سارة محمد", age: 28, job: "محللة بيانات", bookingDate: "2025-05-01" }
  };

  const subscriber = subscribers[id];

  return (
    <div className="container">
      <h2>📋 بيانات المشترك</h2>
      {subscriber ? (
        <div className="subscriber-card">
          <p><strong>👤 الاسم:</strong> {subscriber.name}</p>
          <p><strong>🎂 العمر:</strong> {subscriber.age} سنة</p>
          <p><strong>💼 الوظيفة:</strong> {subscriber.job}</p>
          <p><strong>📅 تاريخ الحجز:</strong> {subscriber.bookingDate}</p>
        </div>
      ) : (
        <p className="error-message">⚠️ المشترك غير موجود!</p>
      )}
    </div>
  );
};

export default SubscriberInfo;
