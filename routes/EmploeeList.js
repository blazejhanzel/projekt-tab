const express = require('express')
const connection = require('./../modules/database')
var router = express.Router()
var session = null

const assignSessionVariable = (sess) => session = sess

//{"id":1, "active":true, "username": "lesnik", "role": "Emploee", "first_name": "Andżej", "last_name": "Cienkopis", "salary":2800}


router.get('/', (req, res) => {
    connection.query('SELECT id, active, username, role, first_name, last_name, salary FROM users', (err,result)=> {
        if (err) throw err

        res.send(result)
        return
    })
})

router.put('/', (req, res) => {
    if (req.body.id == "-1") {
        connection.query(`INSERT INTO users (active, username, password, role, first_name, last_name, salary)
            VALUES ('${req.body.active}','${req.body.username}','${req.body.password}','${req.body.role}','${req.body.first_name}','${req.body.last_name}','${req.body.salary}')`)
    }
    else {
        connection.query(`UPDATE users SET
            active = '${req.body.active}',
            username = '${req.body.username}',
            password = '${req.body.password}',
            role = '${req.body.role}',
            first_name = '${req.body.first_name}',
            last_name = '${req.body.last_name}',
            salary = '${req.body.salary}'
            WHERE id = '${req.body.id}'`)
    }
    return
})

module.exports = {
    router,
    assignSessionVariable
}