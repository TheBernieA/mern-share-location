import { Fragment } from "react";
import UsersList from "../components/UsersList";

const Users = () => {
    const USERS = [
        {
            id:'u1',
            name:'Mario Rossi',
            image:'https://upload.wikimedia.org/wikipedia/it/thumb/6/62/Mario_Rossi_%28direttore_d%27orchestra%29.jpg/1024px-Mario_Rossi_%28direttore_d%27orchestra%29.jpg',
            places:5
        }
    ]
  return (
    <Fragment>
      <UsersList items={USERS}/>
    </Fragment>
  );
};

export default Users;

//EVEN WHEN WE ARE NOT SIGNED UP, WE CAN SEE A LIST OF USERS AND PLACES THEY'VE SHARED
