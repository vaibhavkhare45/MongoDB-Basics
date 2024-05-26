const express = require('express');
const mongoose = require('mongoose');

main().then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number
});

const User = mongoose.model('User', userSchema);
// const Employee = mongoose.model('Employee', userSchema);

//inserting data into database

const user1 = new User({ 
    name: 'Vaibhav khare',
    email: 'vaibhavkhare45@gmail.com',
    age: 20 
});
user1.save();

const user2 = new User({ 
    name: 'Ayush rai',
    email: 'ayushrai08@gmail.com',
    age: 19
 });
user2.save();


//inserting multiple data into database

User.insertMany([
    { name: 'om', email: 'om@gmail.com', age: 20 },
    { name: 'raj', email: 'raj@gmail.com', age: 21 },
    { name: 'rajat', email: 'rajat@gmail.com', age: 22 }
]).then((res)=>{
    console.log(res);
});


// finding data from database

User.find({})
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

// findOne method

User.findOne({ name: 'rajat' })
    .then((res) => {
        console.log(res);
    });

// findById method

User.findById('6651a3f7e3c853d32e8058c4').then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});

// update data in database

User.updateOne(
    { _id: '6651a3f7e3c853d32e8058c4' },
    { name: 'Dipesh', age: 21 , email: 'dipesh@gmail.com'})
    .then((res) => {
        console.log(res);
    });

User.updateOne(
    { _id: '6651a3f7e3c853d32e8058c3' },
    { name: 'arun', age: 19 , email: 'arun@gmail.com'})
    .then((res) => {
        console.log(res);
    });

//updateMany method

User.updateMany({age:{ $gt: 20 }},{ age: 26 })
    .then((res) => {
        console.log(res);
    }).catch((err) => {   
        console.log(err);
    });

//findOneAndUpdate method

User.findOneAndUpdate({name: 'Dipesh'},{ age: 23 }, { new: true })
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });


//delete data from database

User.deleteOne({ name: 'arun' })
    .then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });

// DeleteMany method

User.deleteMany({ age:{$gt:20} }).then((res) => {
    console.log(res);
}).catch((err) => {  
    console.log(err);
}   );


// FindByIdAndDelete() method

User.findByIdAndDelete('6651a185fe7638975cc004b7')
    .then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });

// FindOneAndDelete() method

User.findOneAndDelete({ age: 20 }).then((res) => {
    console.log(res);
}).catch((err) => {
    console.log(err);
});