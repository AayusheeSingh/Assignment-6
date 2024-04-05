import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useAtom } from 'jotai';
import { favouritesAtom } from '../store';
import ArtworkCard from '../components/ArtworkCardDetail';

const Favourites = () => {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) return null;

  return (
    <Container>
      <Row className="gy-4">
        {favouritesList.length > 0 ? (
          favouritesList.map((objectID) => (
            <Col lg={3} key={objectID}>
              <ArtworkCard objectID={objectID} />
            </Col>
          ))
        ) : (
          <Col>
            
                <h4>Nothing Here</h4>
                Try adding some new artwork to the list.
              
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Favourites;
