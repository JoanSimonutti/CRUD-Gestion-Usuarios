import React, { Fragment } from "react";

export const About = () => (
    <div className="container pt-3">
        <p>
            This application is a CRUD platform (Create, Read, Update, Delete) for user management, developed with Flask, MongoDB, and React, forming an efficient and scalable stack.<br />
            <br />
            On the backend, a RESTful API is implemented with Flask, exposing routes to perform CRUD operations (GET, POST, PUT, DELETE) on users. It also includes the GET /user/id route to retrieve specific user data when editing.<br />
            <br />
            The database used is MongoDB, where users are stored as JSON documents. The connection between Flask and MongoDB is handled using the PyMongo library, enabling simple and efficient data manipulation and queries.<br />
            <br />
            On the frontend, React is used along with the useState and useEffect hooks to manage the form state and data loading. A controlled form is implemented to create and update users, and a dynamic table displays the current list, with buttons to edit or delete each user.<br />
            <br />
            Communication between client and server is done via fetch using asynchronous requests, ensuring a smooth experience without page reloads. Environment variables are also used to define the base API URL, simplifying environment configuration and improving security.<br />
            <br />
            Overall, this application demonstrates full-stack flow proficiency, applying best practices in both client and server architecture.<br />
            <br />
        </p>
        <p className="signature">
            Joan Simonutti<br />
            <a className="signature-link" href="https://www.linkedin.com/in/joansimonutti/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a className="signature-link" href="https://github.com/joansimonutti" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
    </div>
)
