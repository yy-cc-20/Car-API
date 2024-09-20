const Car = require('../Models/Car');
const _ = require('lodash');

const carList = [
    {
        name: 'Tesla Model S',
        brand: 'Tesla',
        description: 'The Tesla Model S is a full-size luxury sedan that is known for its exceptional performance, impressive range, and advanced technology features. With a range of up to 373 miles on a single charge, the Model S is a great option for those who want to go electric without sacrificing on performance. The car features a sleek and modern design, with a spacious interior and a massive touchscreen display that controls everything from the navigation system to the climate control. The Model S also boasts a range of advanced safety features, including Autopilot, which enables semi-autonomous driving. With its impressive acceleration and smooth ride, the Tesla Model S is a great option for those who want a luxurious and environmentally friendly driving experience.',
        variance: [
            {
                name: 'Tesla Model S Long Range',
                price: 79990
            },
            {
                name: 'Tesla Model S Plaid',
                price: 119990
            }
        ]
    },
    {
        name: 'BMW 3 Series',
        brand: 'BMW',
        description: 'The BMW 3 Series is a compact luxury sedan that is known for its exceptional handling, impressive performance, and premium features. With a range of engine options, including a powerful inline-6 and a efficient 4-cylinder, the 3 Series has something for everyone. The car features a sleek and sporty design, with a spacious interior and a range of advanced technology features, including a touchscreen display and a premium sound system. The 3 Series also boasts a range of advanced safety features, including adaptive cruise control and lane departure warning. With its exceptional handling and impressive performance, the BMW 3 Series is a great option for those who want a fun and luxurious driving experience.',
        variance: [
            {
                name: 'BMW 3 Series Sedan',
                price: 41000
            },
            {
                name: 'BMW 3 Series M340i xDrive',
                price: 54600
            }
        ]
    },
    {
        name: 'Ford Mustang',
        brand: 'Ford',
        description: 'The Ford Mustang is a iconic American muscle car that is known for its powerful engine, aggressive styling, and exceptional performance. With a range of engine options, including a powerful V8 and a efficient 4-cylinder, the Mustang has something for everyone. The car features a sleek and sporty design, with a spacious interior and a range of advanced technology features, including a touchscreen display and a premium sound system. The Mustang also boasts a range of advanced safety features, including blind spot monitoring and forward collision warning. With its exceptional acceleration and smooth ride, the Ford Mustang is a great option for those who want a fun and exciting driving experience.',
        variance: [
            {
                name: 'Ford Mustang EcoBoost',
                price: 27155
            },
            {
                name: 'Ford Mustang GT Premium',
                price: 39685
            }
        ]
    },
    {
        name: 'Audi A4',
        brand: 'Audi',
        description: 'The Audi A4 is a compact luxury sedan that is known for its exceptional comfort, impressive performance, and premium features. With a range of engine options, including a powerful 4-cylinder and a efficient 2.0-liter turbo, the A4 has something for everyone. The car features a sleek and modern design, with a spacious interior and a range of advanced technology features, including a touchscreen display and a premium sound system. The A4 also boasts a range of advanced safety features, including adaptive cruise control and lane departure warning. With its exceptional comfort and impressive performance, the Audi A4 is a great option for those who want a luxurious and practical driving experience.',
        variance: [
            {
                name: 'Audi A4 Premium',
                price: 39300
            },
            {
                name: 'Audi A4 Prestige',
                price: 47500
            }
        ]
    },
    {
        name: 'Mercedes-Benz C-Class',
        brand: 'Mercedes-Benz',
        description: 'The Mercedes-Benz C-Class is a compact luxury sedan that is known for its exceptional comfort, impressive performance, and premium features. With a range of engine options, including a powerful V6 and a efficient 4-cylinder, the C-Class has something for everyone. The car features a sleek and modern design, with a spacious interior and a range of advanced technology features, including a touchscreen display and a premium sound system. The C-Class also boasts a range of advanced safety features, including adaptive cruise control and lane departure warning. With its exceptional comfort and impressive performance, the Mercedes-Benz C-Class is a great option for those who want a luxurious and practical driving experience.',
        variance: [
            {
                name: 'Mercedes-Benz C-Class C 300',
                price: 41400
            },
            {
                name: 'Mercedes-Benz C-Class AMG C 43',
                price: 56900
            }
        ]
    },
    {
        name: 'Lexus IS',
        brand: 'Lexus',
        description: 'The Lexus IS is a compact luxury sedan that is known for its exceptional performance, impressive handling, and premium features. With a range of engine options, including a powerful V6 and a efficient 4-cylinder, the IS has something for everyone. The car features a sleek and sporty design, with a spacious interior and a range of advanced technology features, including a touchscreen display and a premium sound system. The IS also boasts a range of advanced safety features, including adaptive cruise control and lane departure warning. With its exceptional handling and impressive performance, the Lexus IS is a great option for those who want a fun and luxurious driving experience.',
        variance: [
            {
                name: 'Lexus IS 300',
                price: 39850
            },
            {
                name: 'Lexus IS 350 F Sport',
                price: 44275
            }
        ]
    },
];

//async function seedCarData() {
//    //await mongoose.connect(process.env.MONGO_DB_URL)

//    if (Car.countDocuments() > 0)
//        return;

//    const batchSize = 100;
//    const batches = _.chunk(carList, batchSize);

//    // Insert seed data
//    for (const batch of batches) {
//        await Car.insertMany(batch);
//    }

//    console.log('Car data seeded successfully!');
//}


// Function to seed the database
const seedCarData = async () => {
    // Optional: Clear existing users
    await Car.deleteMany({});
    console.log('Old cars removed');

    // Insert seed users
    await Car.insertMany(carList);
    console.log('Car data seeded successfully');
};

module.exports = seedCarData