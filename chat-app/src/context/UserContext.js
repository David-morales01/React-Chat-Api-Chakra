import { createContext } from "react";

const UserContext = createContext({
    id:null,
    name:null,
    email:null,
});
export default UserContext;