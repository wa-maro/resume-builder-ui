import { Link } from "react-router-dom";

const SideBarNav = () => {
  return (
    <nav>
      <ul className="space-y-2">
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Personal Info
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Education
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Experience
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Skill
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Referee
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Summary
          </Link>
        </li>
        <li>
          <Link to="#" className="block text-gray-700 hover:text-blue-600">
            Declaration
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideBarNav;
