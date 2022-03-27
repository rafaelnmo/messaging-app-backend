import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Videos from './dbModel.js'

// App Config
const password = 'K2swm4p6g8h9'
const app = express()
const port = process.env.PORT || 9000
//Replace <password> with the password for the roliveira user. Replace myFirstDatabase with a name for the database that connections will use by default. Ensure any option params are URL encoded.
const connection_url = 'mongodb+srv://roliveira:'+password+'@cluster1.zccqm.mongodb.net/shortVideoDB?retryWrites=true&w=majority'

// Middleware
app.use(express.json())
app.use(Cors())

// DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    //useCreateIndex: true,  <----- Depreciated
    useUnifiedTopology: true
})

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello TheWebDev"))

app.post('/v2/posts', (req, res) => {
    const dbVideos = req.body
    Videos.create(dbVideos, (err, data) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/v2/posts', (req, res) => {
    Videos.find((err, data) => {
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})




// Listner
app.listen(port, () => console.log(`Listening on localhost: ${port}`))