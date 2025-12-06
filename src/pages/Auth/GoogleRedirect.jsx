
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import Loading from "../../components/Loading";

const GoogleRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error(error);
        navigate("/auth/login");
        return;
      }
      if (session?.user) {
        navigate("/student/dashboard");
      } else {
        navigate("/auth/login");
      }
    };
    handleRedirect();
  }, [navigate]);

  return <Loading />;
};

export default GoogleRedirect;
