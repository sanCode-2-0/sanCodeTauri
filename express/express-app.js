const express = require('express');
const app = express();
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const moment = require("moment-timezone");
// Array holding ailments checked
const ailmentsChecked = require("./assets/ailmentsChecked");
app.use(cors());
app.use(express.json());

//Open a database connection
//Open a database RTCPeerConnection

//Database variables
const databaseName = "sanCodeTrial.db"
const tableName = "sanCodeTrialStudentTable"
const staffTableName = "sanCodeTrialStaffTable"
const reportTableName = "sanCodeTrialReportTable"
// Timestamp
const timestamp = moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss');
// Start of today date
const startOfToday = moment().startOf("day");
const endOfToday = moment().endOf("day");

const db = new sqlite3.Database(`database/${databaseName}`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

//Endpoint to validate that student exists in the database
app.get("/students/:admissionNumber", async (req, res) => {
    const admissionNumber = req.params.admissionNumber;

    // Select table
    db.all(`SELECT * FROM ${tableName} WHERE admNo=${admissionNumber}`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
})

// Endpoint to accept data from the full entry submission
app.post("/student-full-entry", async (req, res) => {
    const { studentAdmNo, tempReading, complain, ailment, medication } = req.body;

    // Update record where student admno is studentAdmNo
    db.run(
        `UPDATE ${tableName} SET tempReading=?, complain=?, ailment=?, medication=?, timestamp=? WHERE admNo=?`,
        [tempReading, complain, ailment, medication, timestamp, studentAdmNo],
        (error) => {
            if (error) {
                res.status(500).send("Error updating the record.");
            } else {
                res.send("Record updated successfully.");
            }
        }
    );
});

// Endpoint to accept data from the quick update submission
app.post("/student-quick-update", async (req, res) => {
    const { studentAdmNo, tempReading } = req.body;

    // Update record where student admission number is studentAdmNo
    db.run(
        `UPDATE ${tableName} SET tempReading=?, timestamp=? WHERE admNo=?`,
        [tempReading, timestamp, studentAdmNo],
        (error) => {
            if (error) {
                res.status(500).send("Error updating the record.");
            } else {
                res.send("Record updated successfully.");
            }
        }
    );
});

//Endpoint to validate that student exists in the database
app.get("/staff/:idNo", async (req, res) => {
    let idNo;
    idNo = req.params.idNo;

    // Select table
    db.all(`SELECT * FROM ${staffTableName} WHERE idNo=${idNo}`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
})

// Endpoint to accept data from the full entry submission for a staff member
app.post("/staff-full-entry", async (req, res) => {
    const { idNo, tempReading, complain, ailment, medication } = req.body;

    // Update record where staff Kenyan id No is idNo
    db.run(
        `UPDATE ${staffTableName} SET tempReading=?, complain=?, ailment=?, medication=?, timestamp=? WHERE idNo=?`,
        [tempReading, complain, ailment, medication, timestamp,idNo],
        (error) => {
            if (error) {
                res.status(500).send("Error updating the record.");
            } else {
                res.send("Record updated successfully.");
            }
        }
    );
});

// Endpoint to accept data from the quick update submission for a staff member
app.post("/staff-quick-update", async (req, res) => {
    const { idNo, tempReading } = req.body;

    // Update record where staff idNo is idNo
    db.run(
        `UPDATE ${staffTableName} SET tempReading=?, timestamp=? WHERE admNo=?`,
        [tempReading, timestamp, idNo],
        (error) => {
            if (error) {
                res.status(500).send("Error updating the record.");
            } else {
                res.send("Record updated successfully.");
            }
        }
    );
});

// Endpoint to fetch all student data for purposes of the nurse filtering
app.get("/student-data", (req, res) => {
    db.all(`SELECT * FROM ${tableName} ORDER BY timestamp DESC`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.json(rows);
    });
});

// Endpoint to fetch all staff data for purposes of the nurse filtering
app.get("/staff-data", (req, res) => {
    db.all(`SELECT * FROM ${staffTableName} ORDER BY timestamp DESC`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.json(rows);
    });
});

// Endpoint to update report data
app.get("/update-report",(req, res)=>{
    db.all(`SELECT * FROM ${tableName}`, [], (err, rows) => {


        if (err) {
            console.error(err.message);
        }

        // Transform the rows to objects
        const data = rows.map((row) => {
            const obj = {};
            Object.keys(row).forEach((key) => {
                obj[key] = row[key];
            });
            return obj;
        });

        let filteredData=[]; //Just like the data array but holds records whose date matches today's
        let dateToBeChecked
        // Loop through the data array which holds the records as individual objects.
        for(let dataArrayLength = 0; dataArrayLength < data.length; dataArrayLength++){
            //Filter and only retrieve records whose timestamp matches to today's

            // Format the date to Moment.js format
            dateToBeChecked = moment(data[dataArrayLength].timestamp, "YYYY-MM-DD HH:mm:ss")

            // If it falls between start of today and end of the day, spread it into the filteredData array
            // Since it will be handling a lot of data, using the spread operator is kind of effective
            if(dateToBeChecked.isBetween(startOfToday, endOfToday)){
                filteredData = [...filteredData,data[dataArrayLength]];
            }
        }




        // Update today's column in the report with the respective data

        // Array to hold all ailments is imported
        // Object to hold result of counting

        let countByAilment = {}
        let count = 0;
        ailmentsChecked.forEach((eachAilment)=>{
            count = filteredData.filter((item) => item.ailment === eachAilment).length;

            // Pass the ailments and respective counts to the countByAilment array
            countByAilment[ailmentsChecked] = count;
        },0)

        // countByAilment contains an object with the disease and count for that day
        // Update the report table

        // have today's data, now update the report table
        const todayAsANumber = moment().date();

        for(const eachAilmentToUpdate in countByAilment){

            if(countByAilment.hasOwnProperty(eachAilmentToUpdate)){
                const updateValue = countByAilment[eachAilmentToUpdate];

                //SQL statement to carry out the update
                const sqlUpdateReportTable = `UPDATE ${reportTableName} 
                SET
                "${todayAsANumber}" = ${updateValue}
                WHERE
                disease = "${eachAilmentToUpdate}"
                `;



                //Run the sql statement
                db.run(sqlUpdateReportTable, (error)=>{
                    if(error){
                        console.error("SQLITE STATEMENT EXECUTION STATEMENT ERROR : "+error.message)
                    } else {
                        // Maybe log it? some log file?
                        // console.log(`Updated ${eachAilmentToUpdate} with ${updateValue} for this day of the month : ${todayAsANumber}`)
                    }
                })
            }
        }




        // Clear tomorrow's up to the last day of the month's records - set all the diseases to zero
        // How many times should this function run?
        const dateTomorrow = moment().add(1, "day")
        const dateEndOfMonth = moment().endOf('month')

        let startingDate = dateTomorrow.clone();

        // Store all these SQL statements as batch which I'll process outside the loop
        let batchSQLRevertStatements = [];
        while(startingDate.isSameOrBefore(dateEndOfMonth, 'day')){
            // Sqlite3 - update the table and clear the values
            // timestamp - filteredData
            const columnNumber = startingDate.format("DD")
            const sqlRevertValues = `UPDATE ${reportTableName} 
            SET "${columnNumber}" = 0
            `
            // Pass the SQL statements into the array - spread operator
            batchSQLRevertStatements = [...batchSQLRevertStatements, sqlRevertValues]

            //Move on to the next day
            startingDate.add(1, "day")
        }

        // Execute statements using a transaction
        db.serialize(()=>{
            // Execute each update statement in the array
            batchSQLRevertStatements.forEach((eachSQLStatement)=>{
                db.run(eachSQLStatement, (error)=>{
                    if(error){
                        console.error("BATCH TRANSACTION ERROR : "+error)
                    } else {
                        // console.error("BATCH TRANSACTION FOR "+eachSQLStatement+ "EXECUTED")
                    }
                })
            })
        })
        res.json({status: "successful"});
    });
})



// Endpoint to return report data
app.get("/report", (req, res) => {
    // Select table
    db.all(`SELECT * FROM ${reportTableName}`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }

        // Transform the rows to objects
        const data = rows.map((row) => {
            const obj = {};
            Object.keys(row).forEach((key) => {
                obj[key] = row[key];
            });
            return obj;
        });
        res.json(data);
    });
})

// Close the database connection after the response is sent
app.use((req, res, next) => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
    next();
});

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
