
const express = require('express');
const jwt = require('jsonwebtoken');


const { dbConn } = require("./database/db");


const { User } = require("./user/user.js");

const { Role } = require("./Role/role.js");

const { School } = require("./school/school.js");

const { Student } = require("./student/student.js");


const app = express();
const bcrypt = require('bcryptjs');

const port = 8000;
dbConn();
app.use(express.json())


//user Api

app.post('/user/signup', async (req, res) => {
    try {

        let { firstname, lastname, email, mobile, password, roleId } = req.body
        /*generate password hash*/
        const salt = await bcrypt.genSalt(10);//length of the password
        password = await bcrypt.hash(password, salt)
        let user = new User({ firstname, lastname, email, mobile, password, roleId })
        let data = await user.save()
        return res.status(200).json({
            message: `User Saved successfully`,
            data
        })

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })

    }
})


app.post('/user/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        let user = await User.findOne({ email: email })
        if (user) {
            let verifyUser = await bcrypt.compare(password, user.password)
            if (verifyUser) {
                let payload = {
                    user: {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        mobile: user.mobile
                    }
                }
                let token = jwt.sign(payload, 'edtech', { expiresIn: 3600 })//secret key,after one hour new authorization/token is needed to be generated, for security purpose like net banking
                res.status(200).json({
                    message: `Logged In`,
                    user: { id: user._id, firstname: user.firstname, lastname: user.lastname, email: user.email, mobile: user.mobile },
                    token
                })
            }
            else {
                res.status(401).json({
                    message: "Wrong Username/Password"
                })
            }
        } else {
            res.status(401).json({
                message: "Wrong Username/Password"
            })
        }

    } catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})



app.get('/user', async (req, res) => {

    let users = await User.find();
    try {

        if (users == '') {
            return res.status(400).json({
                message: `No Content available`
            })

        } else {
            return res.status(200).json({
                message: `user retrieved successfully`,
                users
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

})



app.get('/user/:id', async (req, res) => {
    try {
        let id = req.params.id
        const user = await User.findOne({ id: req.params._id })
        if (id == '' || id == undefined) {
            return res.status(204).json({
                message: `No Content available`
            })

        } else {
            res.json(user)
            return res.status(200).json({

                message: `user retrieved successfully`,

            })
        }


    }
    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
}
)



//Role Api

app.post("/role", async (req, res) => {


    let { name, scopes } = req.body

    if (name == '' || name == undefined) {
        error = 'missing name'
        res.status(400).json({
            message: error
        })
    }

    if (scopes == '' || scopes == undefined) {
        error = 'Missing scope Description'
        res.status(400).json({
            message: error
        })
    }


    let Name = {
        name,
        scopes,
    }

    let role = new Role(Name)
    let data = await role.save()
    try {
        res.status(200).json({
            message: "Data saved successfully",
            data
        })
    }

    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})
app.get('/role', async (req, res) => {

    let role = await Role.find();
    try {

        if (role == '') {
            return res.status(400).json({
                message: `No Content available`
            })

        } else {
            return res.status(200).json({
                message: `role retrieved successfully`,
                role
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

})



//school Api


app.post("/school", async (req, res) => {


    let { name, city, state, country } = req.body

    if (name == '' || name == undefined) {
        error = 'missing name'
        res.status(400).json({
            message: error
        })
    }
    if (city == '' || city == undefined) {
        error = 'missing city name'
        res.status(400).json({
            message: error
        })
    }
    if (state == '' || state == undefined) {
        error = 'missing  state name'
        res.status(400).json({
            message: error
        })
    }

    if (country == '' || country == undefined) {
        error = 'Missing country name'
        res.status(400).json({
            message: error
        })
    }


    let schoolobject = {
        name,
        city,
        state,
        country
    }

    let school = new School(schoolobject)
    let data = await school.save()
    try {
        res.status(200).json({
            message: "Data saved successfully",
            data
        })
    }

    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})



app.get('/school', async (req, res) => {

    let school = await School.find();
    try {

        if (school == '') {
            return res.status(400).json({
                message: `No Content available`
            })

        } else {
            return res.status(200).json({
                message: `school data retrieved successfully`,
                school
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

})


app.get('/school/students', async (req, res) => {

    let school = await School.find();
    let student = await Student.find();
    try {

        if (school == '' || student == '') {
            return res.status(400).json({
                message: `No Content available`
            })

        } else {
            return res.status(200).json({
                message: `school data retrieved successfully`,
                school, student
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

})


//Student Api


app.post("/student", async (req, res) => {


    let { name, userId, schoolId } = req.body

    if (name == '' || name == undefined) {
        error = 'missing name'
        res.status(400).json({
            message: error
        })
    }
    if (userId == '' || userId == undefined) {
        error = 'missing userid'
        res.status(400).json({
            message: error
        })
    }
    if (schoolId == '' || schoolId == undefined) {
        error = 'missing  state name'
        res.status(400).json({
            message: error
        })
    }




    let studentobject = {
        name,
        userId,
        schoolId
    }

    let student = new Student(studentobject)
    let data = await student.save()
    try {
        res.status(200).json({
            message: "Data saved successfully",
            data
        })
    }

    catch (err) {
        res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }
})


app.get('/student', async (req, res) => {

    let student = await Student.find();
    try {

        if (student == '') {
            return res.status(400).json({
                message: `No Content available`
            })

        } else {
            return res.status(200).json({
                message: `student data retrieved successfully`,
                student
            })
        }

    }
    catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message
        })
    }

})

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
})