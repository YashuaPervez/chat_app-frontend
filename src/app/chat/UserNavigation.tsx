// Components
import UserNavigationItem from "./UserNavigationItem";

//
import { User } from "@/types/User";

type UserNavigationProps = {
  users: User[];
};

const UserNavigation: React.FC<UserNavigationProps> = async ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <UserNavigationItem user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserNavigation;
