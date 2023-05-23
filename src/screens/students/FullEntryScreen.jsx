import { useLocation } from "react-router-dom"
const FullEntryScreen = () => {
    const location = useLocation();
    let URL_data_array = [];
    URL_data_array = location.search.split("%20");

    //Get the key-value pairs
    const keyValuePairs = URL_data_array.map(eachElement => {
        const [key, value] = eachElement.split("=");
        return { [key]: value };
    });

    console.log(keyValuePairs);
    return (
        <p>{URL_data_array[1]}</p>

    )
};

export default FullEntryScreen;
