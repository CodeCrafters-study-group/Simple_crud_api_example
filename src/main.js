import Express from 'express'
import cors from 'cors'
import { randomUUID } from 'crypto'

const app = Express();

const users = [

];

app.use(Express.json());
app.use(cors());

app.post('/create-user', (req, res) => {

    try {
        let name = req.body.name;

        if (!name) {
            res.status(400).send("Name is required");
        }

        users.push({
            id: randomUUID(),
            name: name
        
        });

        res.send("User created");
    } catch (error) {
        console.log(error);
        res.status(500).end("Error creating user")
    }
});

app.post('/filter-users', (req, res) => {

    try {
        let name = req.body.name;

        console.log(name);

        let filteredUsers = users.filter(user => user.name.includes(name));

        res.send(filteredUsers);
    } catch (error) {
        console.log(error);
        res.status(500).end("Error getting users")
    }
});

app.get('/get-users', (req, res) => {

    try {
        res.send(users);
    } catch (error) {
        console.log(error);
        res.status(500).end("Error getting users")
    }
});

app.delete('/delete-user/:id', (req, res) => {

    try {
        let id = req.params.id;

        let userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            res.status(404).send("User not found");
        }

        users.splice(userIndex, 1);

        res.send("User deleted");
    } catch (error) {
        console.log(error);
        res.status(404).end("Error getting users")
    }
});

app.put('/update-user/:id', (req, res) => {
    
    try {
        let id = req.params.id;
        let name = req.body.name;

        let userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            res.status(404).send("User not found");
        }

        users[userIndex].name = name;

        res.send("User updated");
    } catch (error) {
        console.log(error);
        res.status(404).end("Error updating user")
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

