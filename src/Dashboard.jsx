import { useNavigate } from "react-router-dom";
import { Settings } from "lucide-react";
import logo from "./assets/logo.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleChairClick = (chairNumber) => {
    navigate(`/chair/${chairNumber}`);
  };

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
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            onClick={() => handleChairClick(num)}
            className="cursor-pointer bg-white shadow-md hover:shadow-xl rounded-xl p-6 flex flex-col items-center justify-center transition duration-200"
          >
            <span className="text-2xl font-semibold mb-3">كرسي {num}</span>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              بدء الطلب
            </button>
          </div>
        ))}

        <div
          onClick={() => handleChairClick("vip")}
          className="cursor-pointer bg-yellow-100 border border-yellow-400 shadow-md hover:shadow-xl rounded-xl p-6 flex flex-col items-center justify-center transition duration-200"
        >
          <span className="text-2xl font-semibold text-yellow-600 mb-3">
            كرسي VIP ⭐
          </span>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            بدء الطلب
          </button>
        </div>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/settings")}
          className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
        >
          <Settings size={18} />
          إعداد الأسعار
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
