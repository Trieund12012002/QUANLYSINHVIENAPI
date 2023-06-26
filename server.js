const express = require('express')
const mongoose = require('mongoose')
const Student = require('./models/studentmodels')

const app = express()
// connecting database
mongoose.connect('mongodb+srv://dangtrieu12012002:12012002@trieuapi.rtlwqev.mongodb.net/API')


app.use(express.json());

//get all list
app.get('/student/getall', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//get by id
app.get('/student/getby/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const student = await Student.findById(id);
      //if (!student) {
       // return res.status(404).json({ message: 'Student not found' });
      //}
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


  
//create
app.post('/student/create', async ( req,res) => {
    console.log(req.body),
    res.send(req.body)
    try{
        const student = await Student.create(req.body)
        res.status(200).json(student);
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

//update
app.put('/student/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndUpdate(id,req.body);
         if (!student) {
             return res.status(404).json({ message: 'Student not found with id ${id}' });
         }
        const updatestudent = await Student.findById(id);
        res.status(200).json(updatestudent);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


//Delete by id
app.delete('/student/delete/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);
        if (!student) {
                return res.status(404).json({ message: 'Student not found with id' });
        }
        res.status(200).json({message:'ID was deleted' + '\n' +  student});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });


//port
app.listen(3002, ()=>{
    console.log('Node API app is running on port 3002')
})
