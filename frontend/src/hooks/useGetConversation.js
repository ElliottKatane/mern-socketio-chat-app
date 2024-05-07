import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversation = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  // on utilise useEffect pour faire une requete get
  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        // comme c'est un get, on n'a pas besoin de passer un objet avec les headers
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []); // en passant un tableau vide, on s'assure que le useEffect ne s'execute qu'une seule fois

  return { conversations, loading };
};

export default useGetConversation;
