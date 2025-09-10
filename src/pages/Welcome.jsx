import { Link } from "react-router-dom";
import styles from "./welcome.module.css"

export default function Welcome() {
  return (
    <div className=" font-poppins min-h-screen flex flex-col items-center justify-center bg-gray-300 p-6">
      <div className="flex">
        <h1 className={styles.letterW}>W</h1>
        <h1 className={styles.letterE}>e</h1>
        <h1 className={styles.letterL}>l</h1>
        <h1 className={styles.letterC}>c</h1>
        <h1 className={styles.letterO}>o</h1>
        <h1 className={styles.letterM}>m</h1>
        <h1 className={styles.letterE1}>e</h1>
        <h1 className={styles.letterP}>!</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow w-full max-w-md ">
        <div className="w-[100%] text-lg flex flex-col items-center pb-5 text-orange-700">
          <h2>Federal University Otuoke</h2>
          <h2>Examination System</h2>
        </div>
        
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
