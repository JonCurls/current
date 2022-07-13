import React from "react";
import { Container, Card } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { BiLinkExternal } from "react-icons/bi";
import "./cards.css";

function Cards() {
  const { loading, data } = useQuery(GET_ME);
  console.log(loading, data);
  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // if data isn"t here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Container className="addHeight">
        <section id="cards">
          <h2>
            {userData?.cards?.length
              ? `Viewing ${userData.cards.length} saved ${
                  userData.cards.length === 1 ? "card" : "cards"
                }:`
              : "You have no saved cards!"}
          </h2>
          <div className="cardColumns">
            <div className="container cardContainer">
              {/* {id, link, title, description} */}
              {userData?.cards?.map((card) => {
                return (
                  <div className="cardObject" key={card._id} border="dark">
                    <Card.Body>
                      <h3 className="cardItem">{card.title}</h3>
                      <a href={card.link} className="btn btn-primary btn-card">
                        <BiLinkExternal
                          style={{
                            position: "relative",
                            top: "20px",
                            height: "40px",
                            width: "100px",
                          }}
                        />
                      </a>
                    </Card.Body>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

export default Cards;
