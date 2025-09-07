import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className=" font-poppins min-h-screen flex items-center justify-center bg-gray-200 p-6">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome!</h1>
        <div className="space-y-4">
          <Link to="/student/login" className="block w-full text-center bg-blue-600 text-white py-3 rounded">
            Continue as Student
          </Link>
          <Link to="/admin/login" className="block w-full text-center bg-gray-900 text-white py-3 rounded">
            Continue as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
