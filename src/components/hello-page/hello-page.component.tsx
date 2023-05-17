import { Container, Row, Col } from "react-bootstrap";
import {
  SiReacthookform,
  SiReactrouter,
  SiReact,
  SiBootstrap,
  SiSass,
  SiTypescript,
  SiAmazonaws,
  SiExpress,
  SiMongodb,
  SiJsonwebtokens,
  SiLetsencrypt,
} from "react-icons/si";

import styles from "./hello-page.module.scss";
const HelloPageComponent = () => {
  return (
    <Container>
      <Row className={`border-bottom px-2 mb-2`}>
        <Col>
          <h1>Hi there!</h1>
        </Col>
      </Row>
      <Row className={`${styles.klRow__introduce} text-center`}>
        <p>
          I would like to introduce you to the technologies and libraries used
          to build this application.
        </p>
        <p>Here's a list of the key components:</p>
      </Row>
      <Row className={`${styles.klRow}`}>
        <Col className={`${styles.klRow__column}`}>
          <h2 className={` text-center`}>Frontend</h2>
          <ul>
            <li>
              <SiReact className={`text-primary ${styles.klRow__react}`} />
              React: It's a JavaScript framework used to build the user
              interface. React is popular for its declarative nature and
              efficient component rendering.
            </li>
            <li>
              <SiBootstrap color="purple" />
              Bootstrap: It's a powerful tool for creating responsive and
              visually appealing user interfaces. It was used in the application
              along with React Bootstrap to provide ready-to-use components and
              styling.
            </li>
            <li>
              <SiReactrouter color="orange" />
              React Router: It's a routing library for React that enables
              dynamic routing and rendering of components based on the current
              URL. It allows for easy navigation within the application and
              building single-page applications.
            </li>
            <li>
              <SiReacthookform color="red" />
              React Hook Form: It's a library that simplifies form management in
              React. It provides convenient hooks for capturing form data,
              validation, and event handling.
            </li>
            <li>
              <SiSass color="pink" />
              Sass: It's a CSS preprocessor that offers additional features like
              variables, nesting, mixins, and more. It allows for more flexible
              and modular styling of the application.
            </li>
            <li>
              <SiTypescript className="text-primary" />
              TypeScript: It's a programming language that introduces static
              typing to JavaScript. Using TypeScript in the React application
              allows for better type control and detection of errors at
              compile-time.
            </li>
          </ul>
        </Col>

        <Col className={`${styles.klRow__column}`}>
          <h2 className={` text-center`}>Backend</h2>
          <ul>
            <li>
              <SiExpress />
              express: It is a fast and minimalist web application framework for
              Node.js. Express simplifies the process of building web
              applications by providing a set of flexible and powerful features,
              including routing, middleware support, and HTTP utility methods.
            </li>
            <li>
              <SiAmazonaws />
              AWS SDK for S3: It is a library for interacting with Amazon S3
              (Simple Storage Service), which allows you to store and retrieve
              data in the cloud. It provides a convenient way to work with S3
              buckets and objects.
            </li>
            <li>
              <SiMongodb color="green" />
              mongoose: It is an Object Data Modeling (ODM) library for MongoDB
              and Node.js. Mongoose simplifies working with MongoDB by providing
              a higher-level abstraction for defining schemas, creating models,
              and performing database operations.
            </li>
            <li>
              <SiTypescript className="text-primary" />
              TypeScript: It's a programming language that introduces static
              typing to JavaScript. Using TypeScript in the React application
              allows for better type control and detection of errors at
              compile-time.
            </li>
            <li>
              <SiJsonwebtokens
                className={`${styles.klRow__jwt} rounded-circle `}
              />
              jsonwebtoken: It is a library used for generating and verifying
              JSON Web Tokens (JWTs) in Node.js applications. JWTs are used for
              authentication and authorization purposes, allowing secure
              transmission of information between parties.
            </li>
            <li>
              <SiLetsencrypt color="gold" />
              bcrypt: It is a library used for password hashing and encryption.
              It provides secure password storage by applying a one-way hash
              function to passwords, making them more resistant to attacks.
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default HelloPageComponent;
