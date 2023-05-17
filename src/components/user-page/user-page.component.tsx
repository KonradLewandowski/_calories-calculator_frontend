import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import infoContext from "../../contexts/info.context";
import { SlHeart } from "react-icons/sl";
import { VscUnverified, VscVerified } from "react-icons/vsc";
import { IUserModel } from "../../models/user.model";
import { fetchUsers } from "../../services/fetch-data.service";

import styles from "./user-page.module.scss";

const UserPageComponent = () => {
  const { setInfoState } = useContext(infoContext);
  const [index, setIndex] = useState(0);
  const [users, setUsers] = useState<IUserModel[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchUsers();
        setUsers(response.body);
      } catch (error) {
        setInfoState({
          errorMessage: "An error occurred while resetting password.",
        });

        console.error("LoginFormComponent Error: ", error);
      }
    })();
  }, [setInfoState]);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Container>
      <Row className={`border-bottom px-2 mb-2`}>
        <Col>
          <SlHeart size={64} className="pb-2" color="red" />
        </Col>
      </Row>
      <Row className="mb-sm-5">
        <Col>
          <p>
            I am extremely pleased that you have decided to register in my
            application. My goal was to create a fully functional MERN
            application. I have implemented here four basic functions in
            applications using persistent storage, which allow for its
            management - CRUD. I am working on further developing the project.
            Below, you can browse the current users who are registered. In the
            top right corner, you have access to a modest profile editing
            feature. I would also like you to take a look at the footer - I have
            included links to my portfolio, repository, as well as social media
            platforms. Thank you for being here.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {users && (
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            variant="dark"
            controls={users.length > 0}
            className={`${styles.klCarousel}  `}
          >
            {users.map((user, index) => (
              <Carousel.Item key={index} className={`text-center`}>
                <div className={`px-4 pb-5 `}>
                  <img
                    className={`${styles.klCarousel__image} w-100 rounded-4 shadow `}
                    src={user.avatar}
                    alt={`Slide ${index + 1}`}
                  />
                </div>
                <Carousel.Caption className="d-flex gap-1 justify-content-center">
                  <h3
                    className={`${styles.klCarousel__username} text-truncate`}
                  >
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </h3>
                  <span>
                    {user.verified ? (
                      <VscVerified size={24} color="darkgreen" />
                    ) : (
                      <VscUnverified size={24} color="darkred" />
                    )}
                  </span>
                </Carousel.Caption>
                {/*<p>{user.verified}</p>*/}
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </Row>
    </Container>
  );
};

export default UserPageComponent;
