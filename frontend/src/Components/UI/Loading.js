import { Spinner } from "react-bootstrap";
import { useGlobalContext } from "../../context/Context";

const Loading = () => {

  const { isLoading } = useGlobalContext()

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </div>
  );
};

export default Loading;