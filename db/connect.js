const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://khanisrar:Israr123@cluster0.yhzyz4v.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('Connected successfully')
}).catch(err=>{
    console.error(err)
})
