const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    // const c = new Campground({title: 'henry'});
    // await c.save();
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6459e9278a9f9f3ffc6d41dd',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit architecto iste atque dignissimos ab nostrum, repudiandae eos amet distinctio saepe quam facilis tenetur ut dolor maiores in, sed eaque ducimus.",
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dhab6vtqh/image/upload/v1684554881/YelpCamp/p3xkwdfzixpj3ujmvhpg.jpg',
                    filename: 'YelpCamp/p3xkwdfzixpj3ujmvhpg'
                  },
                  {
                    url: 'https://res.cloudinary.com/dhab6vtqh/image/upload/v1684554882/YelpCamp/qrwg1lcvlfsggedkjstf.jpg',
                    filename: 'YelpCamp/qrwg1lcvlfsggedkjstf'
                  },
                  {
                    url: 'https://res.cloudinary.com/dhab6vtqh/image/upload/v1684554882/YelpCamp/iojgaxg6e8aygzucztxf.jpg',
                    filename: 'YelpCamp/iojgaxg6e8aygzucztxf'
                  }                     
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})