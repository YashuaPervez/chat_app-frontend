// Components
import LogoutButton from "./LogoutButton";

//
import { getMe } from "@/api";

const Navbar = async () => {
  const me = await getMe();

  return (
    <div className="flex justify-between">
      <div>
        Loggedin as: {me.firstName} {me.lastName}
      </div>
      <LogoutButton />
    </div>
  );
};

export default Navbar;
