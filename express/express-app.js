const express = require('express');
const app = express();
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

app.use(cors());
app.use(express.json());

//Open a database connection
//Open a database RTCPeerConnection

//Database variables
const databaseName = "sanCodeTrial.db"
const tableName = "sanCodeTrialStudentTable"

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
        `UPDATE ${tableName} SET tempReading=?, complain=?, ailment=?, medication=? WHERE admNo=?`,
        [tempReading, complain, ailment, medication, studentAdmNo],
        (error) => {
            if (error) {
                res.status(500).send("Error updating the record.");
            } else {
                res.send("Record updated successfully.");
            }
        }
    );
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

    // Close database connection
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });

})

// Start the server
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
