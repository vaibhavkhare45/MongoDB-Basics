// *** SCHEMA VALIDATION ***

const mongoose = require('mongoose');

main().then(() => {
    console.log('Connected to MongoDB');
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, //In sql we use not null but mongoose use required
    },
    author:{
        type: String,
    },
    price:{
        type: Number,
        // min: [1,"Price should be greater than 1"] //costom error message
        
    },
    discount:{
        type: Number,
        default: 0,
    },
    category:{
        type: String,
        enum: ['fiction', 'non-fiction', 'self-help', 'biography', 'autobiography']
    },
    genre:[String],
});

const Book = mongoose.model('Book', bookSchema);

Book.findByIdAndUpdate("6652fa9458654addfcdd1fd7", {price: -100}, {runValidators:true}).then((res)=>{
    console.log(res);
}    
).catch((err)=>{
    console.log(err);
});

let book1 = new Book({
    title: 'Marvel comics v2',
    price: 600,
    genre: ["comics","superhero"],
});

book1.save().then((res)=>{
    console.log(res);
}).catch((err)=>{    
    console.log(err);
});