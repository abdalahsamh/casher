import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("lastInvoice");
    if (stored) {
      setInvoice(JSON.parse(stored));
    } else {
      alert("لا توجد فاتورة");
      navigate("/");
    }
  }, []);

  if (!invoice) return null;

  return (
    <div className="bg-white min-h-screen p-6 text-black">
      <div className="max-w-md mx-auto border p-6 rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">
          💈 مقص بلال
        </h2>
        <p>
          <strong>التاريخ:</strong> {new Date().toLocaleString()}
        </p>
        <p>
          <strong>الكرسي:</strong> {invoice.chair}
        </p>
        <p>
          <strong>الزبون:</strong> {invoice.customer}
        </p>

        <hr className="my-4" />

        <h3 className="font-bold mb-2">الخدمات:</h3>
        <ul className="list-disc list-inside space-y-1 mb-4">
          {invoice.services.map((item, i) => (
            <li key={i}>
              {item.name} - {item.price} جنيه
            </li>
          ))}
        </ul>

        <h3 className="text-right text-xl font-bold">
          الإجمالي: {invoice.total} جنيه
        </h3>

        <div className="flex justify-between mt-6">
          <button onClick={() => navigate("/")} className="btn btn-outline">
            رجوع
          </button>
          <button onClick={() => window.print()} className="btn btn-primary">
            طباعة الفاتورة 🖨️
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
