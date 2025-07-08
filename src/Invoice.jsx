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
      const randomNum = Math.floor(100000 + Math.random() * 900000);
      setInvoiceNumber(`INV-${randomNum}`);
    } else {
      alert("لا توجد فاتورة");
      navigate("/");
    }
  }, []);

  if (!invoice) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black flex items-center justify-center print:bg-white">
      <div
        id="printable"
        className="w-[58mm] bg-white text-xs font-mono p-2 border border-gray-400 rounded shadow print:shadow-none print:border-none"
      >
        <h2 className="text-center font-bold text-base mb-2 border-b border-dashed pb-2">
          💈 مقص بلال
        </h2>

        <p>رقم الفاتورة: {invoiceNumber}</p>
        <p>التاريخ: {new Date().toLocaleString()}</p>
        <p>الكرسي: {invoice.chair}</p>
        <p>الزبون: {invoice.customer}</p>
        <p>الفني: {invoice.barber || "—"}</p>

        <div className="my-2 border-t border-dashed" />

        <h3 className="font-bold mb-1">الخدمات:</h3>
        <ul className="mb-2">
          {invoice.services.map((item, i) => (
            <li key={i} className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price} ج</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-dashed my-2" />

        <h3 className="text-right font-bold">الإجمالي: {invoice.total} جنيه</h3>

        <p className="text-center mt-3 text-[10px]">
          شكرًا لزيارتكم ✂️ مقص بلال
        </p>
      </div>

      {/* أزرار التحكم خارج الطباعة */}
      <div className="flex justify-between mt-6 gap-4 print:hidden">
        <button
          onClick={() => navigate("/")}
          className="btn btn-outline btn-sm"
        >
          رجوع ↩️
        </button>
        <button
          onClick={() => window.print()}
          className="btn btn-primary btn-sm"
        >
          طباعة 🖨️
        </button>
      </div>
    </div>
  );
};

export default Invoice;
