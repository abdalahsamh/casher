import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const defaultServices = [
  "قص شعر",
  "تدريج دقن",
  "حلاقة دقن",
  "صبغة",
  "استشوار",
  "ويفي",
  "أفرو",
  "حمام مغربي",
  "تنظيف بشرة بالبخار",
  "تنظيف بشرة - ٧ مراحل",
  "باديكير رجالي",
  "VIP",
  "حمام كريم",
  "ماسك",
  "فرد بوتوكس",
  "بروتين معالج",
  "حمام زيت",
  "جلسة تنظيف قشرة",
  "مساج سوفت",
  "مساج هارد",
  "فوطة سخنة",
  "مكواة",
  "قص أطفال",
  "شمع (Wax)",
  "فتلة",
  "عريس VIP",
  "عريس بريميوم",
  "شاور",
];

const Settings = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("services");
    let extraServices = stored ? JSON.parse(stored) : [];

    // حذف الخدمات اللي موجودة بالفعل ضمن الأساسيات
    extraServices = extraServices.filter(
      (s) => !defaultServices.includes(s.name)
    );

    const allServices = [
      ...defaultServices.map((name) => ({ name, price: 0 })),
      ...extraServices,
    ];
    setServices(allServices);
  }, []);

  const handlePriceChange = (index, newPrice) => {
    const updated = [...services];
    updated[index].price = parseFloat(newPrice) || 0;
    setServices(updated);
  };

  const handleSave = () => {
    localStorage.setItem("services", JSON.stringify(services));
    alert("✅ تم حفظ الأسعار");
    navigate("/");
  };

  const handleResetCounts = () => {
    localStorage.removeItem("orderCounts");
    alert("✅ تم تصفير عداد الطلبات");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-10">💵 إعداد الأسعار</h2>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="overflow-x-auto rounded-xl shadow bg-white p-4">
          <table className="table w-full">
            <thead>
              <tr className="text-base font-bold bg-base-200 text-center">
                <th>الخدمة</th>
                <th>السعر (جنيه)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.name} className="text-center">
                  <td className="py-2">{service.name}</td>
                  <td>
                    <input
                      type="number"
                      className="input input-sm input-bordered w-28"
                      value={service.price}
                      onChange={(e) => handlePriceChange(index, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="btn btn-outline w-full sm:w-1/2"
          >
            رجوع ↩️
          </button>
          <button
            onClick={handleSave}
            className="btn btn-success w-full sm:w-1/2"
          >
            حفظ الأسعار ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
