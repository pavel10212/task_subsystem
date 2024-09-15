import { motion } from 'framer-motion';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const UserInfoIcon = ({ userName, userRole, onLogout }) => {
  return (
    <div className="flex items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center bg-white rounded-full p-2 shadow-md cursor-pointer mr-2 justify-between"
      >
        <FaUser className="text-indigo-600" />
        <div className="flex-1 mx-2 text-s">
          <p className="font-semibold text-indigo-800">{userName}</p>
        </div>
        <p className="text-indigo-600 text-s mr-2">{userRole}</p>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onLogout}
        className="flex items-center bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 transition duration-300"
      >
        <FaSignOutAlt className="mr-1" />
        <span className="text-xs">Logout</span>
      </motion.button>
    </div>
  );
};

export default UserInfoIcon;