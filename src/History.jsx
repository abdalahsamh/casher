import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("invoiceHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleClearHistory = () => {
    const confirmDelete = window.confirm("هل أنت متأكد من مسح كل الفواتير؟");
    if (confirmDelete) {
      localStorage.removeItem("invoiceHistory");
      setHistory([]);
      alert("✅ تم مسح كل الفواتير");
    }
  };

  if (history.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">📭 لا يوجد فواتير محفوظة</h2>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            الرجوع للرئيسية ↩️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">🧾 سجل الفواتير</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow p-4 max-w-4xl mx-auto">
        <table className="table w-full text-center">
          <thead className="bg-base-200">
            <tr>
              <th>رقم</th>
              <th>الزبون</th>
              <th>الفني</th>
              <th>الكرسي</th>
              <th>الإجمالي</th>
              <th>التاريخ</th>
            </tr>
          </thead>
          <tbody>
            {history
              .slice()
              .reverse()
              .map((item, index) => (
                <tr key={index} className="hover">
                  <td>#{index + 1}</td>
                  <td>{item.customer}</td>
                  <td>{item.barber || "—"}</td>
                  <td>{item.chair}</td>
                  <td>{item.total} ج</td>
                  <td>{item.createdAt}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-6 flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline btn-sm"
        >
          الرجوع ↩️
        </button>

        <button onClick={handleClearHistory} className="btn btn-error btn-sm">
          🗑️ مسح كل الفواتير
        </button>
      </div>
    </div>
  );
};

export default History;
