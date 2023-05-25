import { Container, Row } from "react-bootstrap";
import { TbError404 } from "react-icons/tb";

const NotFoundPageComponent = () => {
  return (
    <Container>
      <Row className={`d-inline-flex justify-content-center gap-2 p-4  w-100`}>
        <TbError404 size={96} color="darkred" />
        <h1 className={`text-center`}>Page not found!</h1>
      </Row>
    </Container>
  );
};

export default NotFoundPageComponent;
