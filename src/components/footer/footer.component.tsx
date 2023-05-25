import { Container, Nav, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";

import styles from "./footer.module.scss";

const githubUrl = "https://github.com/KonradLewandowski";
const linkedInUrl = "https://www.linkedin.com/in/konrad-lewandowski-209b75230/";
const websiteUrl = "https://konrad-lewandowski-portfolio.netlify.app/";

const FooterComponent = () => {
  return (
    <footer className={`bg-light p-3 `}>
      <Container className={`px-sm-5 py-2`}>
        <Row>
          <h3 className={`text-center`}>MERN app</h3>
        </Row>
        <Row>
          <Nav>
            <Nav.Item
              className={`${styles.klNav__items} w-100 d-inline-flex justify-content-center gap-2 p-3 `}
            >
              <Link to={githubUrl} target="_blank">
                <AiFillGithub size={32} />
              </Link>

              <Link to={linkedInUrl} target="_blank">
                <AiFillLinkedin size={32} />
              </Link>

              <Link to={websiteUrl} target="_blank">
                <CgWebsite size={32} />
              </Link>
            </Nav.Item>
          </Nav>
          <small className={`text-muted text-center pb-3`}>
            * You can visit my GitHub, LinkedIn or Website by clicking in the
            icon.
          </small>
        </Row>
        <Row>
          <p className={`text-center`}>
            &#169; Created by Konrad Lewandowski 2023
          </p>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
