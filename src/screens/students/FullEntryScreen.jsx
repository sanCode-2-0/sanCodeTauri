import { useParams } from "react-router-dom";
const FullEntryScreen = () => {
  const { studentAdmNo } = useParams();
  console.log(studentAdmNo);
  return <p>{studentAdmNo} Text</p>;
};

export default FullEntryScreen;
