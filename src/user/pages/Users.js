import { Fragment, useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import UsersList from "../components/UsersList";

const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  // const USERS = [
  //     {
  //         id:'u1',
  //         name:'Mario Rossi',
  //         image:'https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg',
  //         places:5
  //     }
  // ]
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:3000/api/users");
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong, counld fetch users");
        }
        setLoadedUsers(data.users);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "Something went wrong");
      }
    };
    sendRequest()
  }, []);
  const errorHandler = () => {
    setError(null);
  };
  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal error={error} onClear={errorHandler} />
      {!isLoading && loadedUsers &&<UsersList items={loadedUsers} />}
    </Fragment>
  );
};

export default Users;

//EVEN WHEN WE ARE NOT SIGNED UP, WE CAN SEE A LIST OF USERS AND PLACES THEY'VE SHARED
