import PageNav from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { useLogInUser } from "../Providers/log-in-user-provider";
import { getUsersByOrganization } from "../services/apiUsers";
import User from "../components/User";
import Spinner from "../components/Spinner";

import "../style.css";
function AdminPage() {
  const { currentUser } = useLogInUser();
  const organization = currentUser.organization;

  //supabase
  const {
    isLoading: isLoadingUsers,
    data: usersData,
    error: errorUsers,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUsersByOrganization(organization),
  });

  if (isLoadingUsers) return <Spinner />;

  //supabase end

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <PageNav />
      <ul>
        {usersData.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </ul>
    </>
  );
}

export default AdminPage;
