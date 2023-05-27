//STYLESHEET
import "../screens.css";

//REACT-ICONS
import { IoPersonAddSharp } from "react-icons/io5"
import { IoCloseCircle } from "react-icons/io5"


import { useLocation } from "react-router-dom"

/*<p>{keyValuePairs[1].studentAdmNo}</p>*/
/*<p>{keyValuePairs[2].fName}</p>*/
/*<p>{keyValuePairs[3].sName}</p>*/
/*<p>{keyValuePairs[4].studentClass}</p>*/
/*<p>{keyValuePairs[5].tempReading}</p>*/
/*<p>{keyValuePairs[6].complain}</p>*/
/*<p>{keyValuePairs[7].ailment}</p>*/
/*<p>{keyValuePairs[8].medication}</p>*/
/*<p>{keyValuePairs[9].timestamp}</p>*/



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
        //<p>{keyValuePairs}</p> tempReading, complain, ailment, medication, timestamp
        <>
            <div className="row">
                <div className="container-fluid">
                    {/* Main Body Content */}
                    <div className="col l12 section main">
                        <div className="card full-entry-padding">
                            <div className="card-content">
                                <i className="right">
                                    <button className="activator btn">Add New Record</button>
                                </i>
                                <blockquote>
                                    <span className="grey-text text-darken-3">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <p>Temperature Reading  : </p>
                                                    </td>
                                                    <td>
                                                        <b>{keyValuePairs[5].tempReading}</b>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <p>Complain : </p>

                                                    </td>
                                                    <td>
                                                        <b>{keyValuePairs[6].complain}</b>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                    </span>
                                </blockquote>
                                <hr />
                                <p><a href="#">This is a link</a></p>
                            </div>
                            <div className="card-reveal">
                                <span className="card-title white-text text-darken-4 right light-blue close-button">
                                    CLOSE
                                </span>
                                <p>Here is some more information about this product that is only revealed once clicked on.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
};

export default FullEntryScreen;
