import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("lastInvoice");
    if (stored) {
      setInvoice(JSON.parse(stored));

      // توليد رقم عشوائي للفاتورة
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setInvoiceNumber(`INV-${randomNum}`);
    } else {
      alert("لا توجد فاتورة");
      navigate("/");
    }
  }, []);

  if (!invoice) return null;

  return (
    <div className="bg-white min-h-screen p-4 text-black">
      <div
        id="printable"
        className="max-w-sm mx-auto border p-4 rounded text-sm leading-relaxed"
      >
        <h2 className="text-center font-bold text-lg mb-2">💈 مقص بلال</h2>
        <p>رقم الفاتورة: {invoiceNumber}</p>
        <p>التاريخ: {new Date().toLocaleString()}</p>
        <p>الكرسي: {invoice.chair}</p>
        <p>الزبون: {invoice.customer}</p>

        <hr className="my-2" />

        <h3 className="font-bold mb-1">الخدمات:</h3>
        <ul className="mb-2">
          {invoice.services.map((item, i) => (
            <li key={i}>
              {item.name} - {item.price} جنيه
            </li>
          ))}
        </ul>

        <h3 className="text-right font-bold mb-2">
          الإجمالي: {invoice.total} جنيه
        </h3>

        <p className="text-center mt-4">شكرًا لزيارتكم ✂️💈</p>
      </div>

      <div className="flex justify-between mt-6 no-print">
        <button onClick={() => navigate("/")} className="btn btn-outline">
          رجوع
        </button>
        <button onClick={() => window.print()} className="btn btn-primary">
          طباعة الفاتورة 🖨️
        </button>
      </div>
    </div>
  );
};

export default Invoice;
