const express = require('express');
const app = express();

const students = [
    {
        id: 1,
        name: "Dungz",
        age: 25
    }

    ,{
        id: 2,
        name: "Thang",
        age: 20
    }

    ,{
        id: 3,
        name: "Duong",
        age: 18
    }
];

// GET /students:
app.get('/students', (req, res) => {
    res.status(200).json({
        code: 0,
        message: "successful",
        data: students
    });
});

// GET /students/:id: 
app.get('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        res.status(200).json({
            code: 0,
            message: "successful",
            data: student
        });
    } else {
        res.status(404).json({
            code: 1,
            message: "Student not found",
            data: null
        });
    }
});

// POST /students: 
app.post('/students', (req, res) => {
    const newStudent = {
        id: students.length + 1, // Create new studentId
        name: req.body.name,
        age: req.body.age
    };
    students.push(newStudent);

    res.status(201).json({
        code: 0,
        message: "successful",
        data: {
            id: newStudent.id
        }
    });
});

// PUT /students/:id: 
app.put('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = students.find(s => s.id === studentId);

    if (student) {
        if (req.body.name) student.name = req.body.name;
        if (req.body.age) student.age = req.body.age;

        res.status(200).json({
            code: 0,
            message: "successful",
            data: null
        });
    } else {
        res.status(404).json({
            code: 1,
            message: "Student not found",
            data: null
        });
    }
});

// DELETE /students/:id: 
app.delete('/students/:id', (req, res) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(s => s.id === studentId);

    if (studentIndex !== -1) {
        students.splice(studentIndex, 1);

        res.status(200).json({
            code: 0,
            message: "successful",
            data: null
        });
    } else {
        res.status(404).json({
            code: 1,
            message: "Student not found",
            data: null
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
