import React from "react";
import { Link } from "react-router-dom";
import { FcTodoList } from "react-icons/fc";
const Logo = () => {
  return (
    <Link to="/welcome" className="flex items-center gap-2 px-1 py-3">
      <FcTodoList fontSize={24} />
      <span className="text-neutral-100 text-lg">ACHIEVO</span>
    </Link>
  );
};

export default Logo;
