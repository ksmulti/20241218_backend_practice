import express from 'express'
import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { User } from "@/entity/User"

async function main() {
    try {
        await AppDataSource.initialize()

        console.log("Inserting a new user into the database...")
        const user = new User()
        user.firstName = "Timber"
        user.lastName = "Saw"
        user.age = 25
        await AppDataSource.manager.save(user)
        console.log("Saved a new user with id: " + user.id)

        console.log("Loading users from the database...")
        const users = await AppDataSource.manager.find(User)
        console.log("Loaded users: ", users)

        console.log("Here you can setup and run express / fastify / any other framework.")
    } catch (error) {
        console.log(error)
    }
}

main()


const app: express.Express = express()
const port = 3000

app.get('/', (_req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})