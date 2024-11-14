![Static Badge](https://img.shields.io/badge/license-MIT-blue?style=flat)

# Social Media API with MongoDB

- [Link to video](https://drive.google.com/file/d/1wOpMIZ35kDaIg7Japr74g2UF0RHq76dR/view?usp=sharing)

## Description
This project is a RESTful API for a social media platform built with MongoDB. It provides endpoints for managing users, thoughts (posts), reactions to thoughts, and friend relationships. The API implements a NoSQL database structure using MongoDB and Mongoose ODM to handle complex data relationships and social networking features.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)
- [Authors and acknowledgment](#authors-and-acknowledgment)
- [License](#license)

## Installation
1. Clone the repository
2. Run `npm install` to install required packages
3. Ensure MongoDB is installed and running on your system
4. Configure your MongoDB connection in the project

## Usage
1. Run `npm start` to start the server
2. Use an API testing tool like Insomnia or Postman to interact with the endpoints

### Available Endpoints:

**Users:**
- GET `/api/users` - Get all users
- GET `/api/users/:userId` - Get single user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/:userId` - Update a user
- DELETE `/api/users/:userId` - Delete a user

**Friends:**
- POST `/api/users/:userId/friends/:friendId` - Add a friend
- DELETE `/api/users/:userId/friends/:friendId` - Remove a friend

**Thoughts:**
- GET `/api/thoughts` - Get all thoughts
- GET `/api/thoughts/:thoughtId` - Get single thought by ID
- POST `/api/thoughts` - Create a new thought
- PUT `/api/thoughts/:thoughtId` - Update a thought
- DELETE `/api/thoughts/:thoughtId` - Delete a thought

**Reactions:**
- POST `/api/thoughts/:thoughtId/reactions` - Add a reaction
- DELETE `/api/thoughts/:thoughtId/reactions/:reactionId` - Remove a reaction

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- JavaScript
- Git

## How to Contribute
To contribute:
1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request with a description of your changes

## Questions
You can reach me for questions at:
- GitHub Profile: [marioxabel](https://github.com/marioxabel)

## Authors and acknowledgment
- Author: [Mario](https://github.com/marioxabel)
- This was a challenge for the [Tecnológico de Monterrey Coding Boot Camp](https://bootcamp.tec.mx/coding/)

## License
Distributed under the MIT License. [Click to see the full MIT license](https://choosealicense.com/licenses/MIT/).