const express = require('express');
const app = express();
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

app.use(cors());

//Open a database connection
//Open a database RTCPeerConnection
const db = new sqlite3.Database('database/sanCodeTrial.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});
//Endpoint to validate that student exists in the database
app.get("/students/:admissionNumber", async (req, res) => {
    const admissionNumber = req.params.admissionNumber;
    console.log(admissionNumber);

    // Select table
    db.all(`SELECT * FROM sanCodeTrialStudentTable WHERE admNo=${admissionNumber}`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        // Transform the rows to objects
        // const data = rows.map((row) => {
        //     const obj = {};
        //     Object.keys(row).forEach((key) => {
        //         obj[key] = row[key];
        //     });
        //     return obj;
        // });

        res.json(rows);
    });
})

// Endpoint to return report data
app.get("/report", (req, res) => {
    // Select table
    db.all('SELECT * FROM sanCodeTrialReportTable', [], (err, rows) => {
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
