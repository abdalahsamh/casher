import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import logo from "./assets/logo.png";
import useStore from "./store";

const Dashboard = () => {
  const navigate = useNavigate();

  const orderCounts = useStore((state) => state.orderCounts);
  const incrementOrderCount = useStore((state) => state.incrementOrderCount);
  const decrementOrderCount = useStore((state) => state.decrementOrderCount); // جديد
  const resetSingleOrderCount = useStore(
    (state) => state.resetSingleOrderCount
  ); // جديد
  const services = useStore((state) => state.services);
  const addService = useStore((state) => state.addService);
  const initializeData = useStore((state) => state.initializeData);

  const [newService, setNewService] = useState("");

  useEffect(() => {
    initializeData();
  }, []);

  const handleChairClick = (chairNumber) => {
    incrementOrderCount(chairNumber);
    navigate(`/chair/${chairNumber}`);
  };

  const handleAddService = () => {
    const trimmed = newService.trim();
    if (!trimmed) return alert("اكتب اسم الخدمة أولاً");

    if (services.find((s) => s.name === trimmed)) {
      return alert("الخدمة موجودة بالفعل");
    }

    addService(trimmed);
    alert("✅ تم إضافة الخدمة");
    setNewService("");
  };

  const renderChairCard = (num, isVIP = false) => (
    <div
      key={num}
      className={`${
        isVIP
          ? "bg-yellow-100 border border-yellow-400 text-yellow-700"
          : "bg-white text-gray-700"
      } shadow-md hover:shadow-xl rounded-xl p-6 flex flex-col items-center justify-center transition duration-200`}
    >
      <span
        className={`text-2xl font-semibold mb-1 ${
          isVIP ? "text-yellow-600" : ""
        }`}
      >
        كرسي {isVIP ? "VIP ⭐" : num}
      </span>
      <span className="text-sm mb-2">عدد الطلبات: {orderCounts[num] || 0}</span>

      {/* الأزرار الثلاثة */}
      <div className="flex gap-2 flex-wrap justify-center">
        <button
          onClick={() => handleChairClick(num)}
          className={`px-3 py-1 rounded ${
            isVIP
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          بدء الطلب
        </button>

        <button
          onClick={() => decrementOrderCount(num)}
          className="bg-gray-300 hover:bg-gray-400 text-black px-3 py-1 rounded"
        >
          ➖
        </button>

        <button
          onClick={() => resetSingleOrderCount(num)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          تصفير
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* ✅ اللوجو */}
      <div className="flex justify-center mb-4">
        <img
          src={logo}
          alt="Logo"
          className="h-32 w-auto object-contain mx-auto"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mb-10">💈 مقص بلال</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5].map((num) => renderChairCard(num))}
        {renderChairCard("vip", true)}
      </div>

      {/* إضافة خدمة جديدة */}
      <div className="text-center mt-10 space-y-4">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition mx-auto"
        >
          <Settings size={18} />
          إعداد الأسعار
        </button>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="اسم خدمة جديدة"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="input input-bordered w-full"
          />
          <button
            onClick={handleAddService}
            className="btn btn-primary w-full sm:w-auto"
          >
            ➕ إضافة
          </button>
          <button
            onClick={() => navigate("/history")}
            className="btn btn-secondary mt-4"
          >
            📜 سجل الفواتير
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
