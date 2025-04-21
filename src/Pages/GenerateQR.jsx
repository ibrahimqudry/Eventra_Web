// import { useState } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import { Link } from "react-router-dom";
// import "../css/qr.css"; 

// const GenerateQR = () => {
//   const [subscriberId, setSubscriberId] = useState("");

//   const subscribers = {
//     "123": { name: "منة المصري", age: 25, job: "مهندسة برمجيات", bookingDate: "2025-03-25" },
//     "456": { name: "أحمد علي", age: 30, job: "مصمم جرافيك", bookingDate: "2025-04-10" },
//     "789": { name: "سارة محمد", age: 28, job: "محللة بيانات", bookingDate: "2025-05-01" }
//   };

//   return (
//     <div className="container">
//       <h2>🔹 إنشاء QR Code للمشتركين 🔹</h2>
//       <input
//         type="text"
//         placeholder="أدخل ID المشترك"
//         value={subscriberId}
//         onChange={(e) => setSubscriberId(e.target.value)}
//       />

//       {subscriberId && subscribers[subscriberId] && (
//         <>
//           <div className="qr-container">
//             <QRCodeCanvas value={`http://localhost:5173/subscriber/${subscriberId}`} size={200} />
//           </div>
//           <p>🔗 امسح الكود لعرض بيانات المشترك</p>
//           <Link to={`/subscriber/${subscriberId}`}>
//             <button>عرض البيانات</button>
//           </Link>
//         </>
//       )}
//     </div>
//   );
// };

// export default GenerateQR;
