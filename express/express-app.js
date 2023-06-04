const express = require('express');
const app = express();
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const moment = require("moment-timezone");

app.use(cors());
app.use(express.json());

//Open a database connection
//Open a database RTCPeerConnection

//Database variables
const databaseName = "sanCodeTrial.db"
const tableName = "sanCodeTrialStudentTable"
const staffTableName = "sanCodeTrialStaffTable"
const timezone = 'Africa/Nairobi';
const timestamp = moment().tz('Africa/Nairobi').format('YYYY-MM-DD HH:mm:ss');

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

// Endpoint to return report data
app.get("/report", (req, res) => {
    // Select table
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
