const express = require('express')
const { connectDb } = require('./db/DbConnect')
const Friend = require('./model/Friend')
const Work = require('./model/Work')
const Car = require('./model/Car')
const Thing = require('./model/Thing')

const app = express()

const PORT = 3000


app.use(express.json())


app.get('/friends', async (req, res) => {
    try {
        const friends = await Friend.findAll({
            include:[
                {
                    model: Work,
                    attributes:[
                        'workname'
                    ]
                },
                {
                    model: Car,
                    attributes: [
                         "carname",
                    ]
                }
            ]
        })

        res.status(200).json(friends)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})



app.get('/friends/:id', async (req, res) => {
    try {

        const friendId = req.params.id;

        const friend = await Friend.findByPk(friendId, {
            include: [
                {
                    model: Work,
                    attributes: [
                        'workname'
                    ]
                },
                {
                    model: Car,
                    attributes: [
                        'carname'
                    ]
                }
            ]
        });

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' })
        }

        const { id, ...friendWithoutId } = friend.toJSON()

        res.status(200).json(friendWithoutId);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
    }
})


app.post('/friends', async (req, res) => {
    try {
        const { name, works, cars } = req.body

        const workname = works ? works.workname : null
        const carnames = cars ? cars.map(car => car.carname) : []
    
        const friend = await Friend.create({ name })

        if (workname) {
            await Work.create({ workname, friend_id: friend.id })
        }

        if (carnames.length > 0) {
            await Promise.all(carnames.map(async carname => {
                await Car.create({ carname, friend_id: friend.id })
            }));
        }

        res.status(201).json({ friend, works, carnames });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
});

app.delete('/friends/:id', async(req, res) =>{
    try{
        const friendId = req.params.id;

        const friend = await Friend.findByPk(friendId, {
            include: [
                {
                    model: Work,
                    attributes: [
                        'workname'
                    ]
                },
                {
                    model: Car,
                    attributes: [
                        'carname'
                    ]
                }
            ]
        })


        if(!friend){
            return res.status(404).json({message:  `Cannot Find PC Friend ID ${friends}`})
        }

        const friends_delete = await friend.destroy(req.body)

        const { id, ...friendWithoutId } = friends_delete.toJSON()

        res.status(201).json({friendWithoutId, message : "Friends Succes Delete"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
})


app.put('/friends/:id', async(req, res) => {
    const friendId = req.params.id;
    const { name, works, cars } = req.body;

    // Find the friend by ID
    let friend = await Friend.findByPk(friendId);

    // Check if the friend exists
    if (!friend) {
        return res.status(404).json({ message: 'Friend not found' });
    }

    // Update the friend's name if provided
    if (name) {
        friend.name = name;
    }

    // Update or associate works
    if (works && works.workname) {
        await Work.create({ workname: works.workname, friend_id: friendId });
    }

    // Update or associate cars
    if (cars && cars.length > 0) {
        await Car.destroy({ where: { friend_id: friendId } }); // Remove existing cars associated with the friend
        await Car.bulkCreate(cars.map(car => ({ carname: car.carname, friend_id: friendId })));
    }


    // Save the updated friend details
    await friend.save();
    
            // Extracting ID and removing it from friend object
    const { id, ...friendWithoutId } = friend.toJSON()


    res.status(200).json({ message: 'Friend updated successfully', friendWithoutId, works, cars });
})
// Running Project
app.listen(PORT, () => {
    connectDb()
    console.log(`Running SERVER http://localhost:${PORT}`)
})



