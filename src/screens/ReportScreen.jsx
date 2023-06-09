import React, { useState, useEffect } from "react";

const ReportScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [reportData, setReportData] = useState([]);
    let [tempReadingPresent, setTempReadingPresent] = useState(0);
    let [withFever, setWithFever] = useState(0);

    const [studentAilmentCounts, setStudentAilmentCounts] = useState({
        fever: 0,
        hepatitis: 0,
    });

    const fetchFromReportEndpoint = async () => {
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/report");

            if (response.ok) {
                const reportData = await response.json();

                if (reportData.length !== 0) {
                    setReportData(reportData);
                }
            } else {
                console.error("API ENDPOINT IS DOWN!");
            }
        } catch (error) {
            console.error("An error occurred while fetching the data: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFromReportEndpoint().then(r => {});
    }, []);



    reportData.map(eachRecord =>{
        // Temperature Reading Present
        if(eachRecord.tempReading !== null){
            tempReadingPresent++;
        }

        // With Fever
        if(eachRecord.ailment !== null){
            withFever++;
        }
        // With Fever today
    })

    studentAilmentCounts.fever = withFever;
    return (
        <>
            <h1>Report Screen</h1>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <p>Students with <b>fever</b> : {studentAilmentCounts.fever} ( This represents counting stuff like redirects to and fro - Those redirects should either have a value or be null) </p>
                    <p>No of records with <b>temperature readings present</b> : {tempReadingPresent}</p>
                    <hr/>

                <ul>
                    {reportData.map((item, index) => (
                        <li key={index}>{JSON.stringify(item)}</li>
                    ))}
                </ul>

                    </>
            )}
        </>
    );
};

export default ReportScreen;
