import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

// create the context
const SocketContext = createContext();

// to be able to co consume the context, we create the hook
export const useSocketContext = () => {
  return useContext(SocketContext);
};

// create the provider
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:5000", {
        query: { userId: authUser._id },
      });

      setSocket(socket);
      // on utilise le map qui contient les utilisateurs (io.emit("getOnlineUsers", userSocketMap);) pour mettre à jour le state (onlineUsers
      // socket.on is used to listen to the events. can be used both on the server and client side

      socket.on("getOnlineUsers", (users) => {
        if (Array.isArray(users)) {
          // Check if users is an array
          setOnlineUsers(users);
        } else {
          console.error("Received data is not an array:", users);
        }
      });
      // will close the socket connection when the component unmounts
      return () => {
        socket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
