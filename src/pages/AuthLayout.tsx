import { Link, useLocation } from "react-router-dom";

const AuthLayout = ({ title, children }: any) => {
  const { pathname } = useLocation();

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-indigo-500 via-purple-500 to-orange-400">
      <div className="bg-white rounded-3xl shadow-xl w-[430px] px-10 py-8 relative backdrop-blur-md">
        
        {/* Tabs */}
        <div className="flex mb-6 text-sm font-medium rounded-md overflow-hidden border">
          <Link
            to="/signup"
            className={`w-1/2 text-center py-2 transition ${
              pathname === "/signup"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Sign up
          </Link>
          <Link
            to="/login"
            className={`w-1/2 text-center py-2 transition ${
              pathname === "/login"
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Log in
          </Link>
        </div>

        <h2 className="text-xl font-semibold text-center mb-6">{title}</h2>

        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
