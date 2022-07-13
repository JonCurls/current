import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import { BiLinkExternal } from "react-icons/bi";

const CardList = () => {
  const { loading, data } = useQuery(QUERY_ME);
  console.log(loading, data);

  const userData = data?.me || {};

  return (
    <>
      <Container>
        <section id="cards">
          <h2>
            {userData?.cards?.length
              ? `Viewing ${userData.cards.length} saved ${
                  userData.cards.length === 1 ? "card" : "cards"
                }:`
              : "You have no saved cards!"}
          </h2>
          <div className="cardColumns">
            {/* changed CardColumns to a classname */}
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
                      {/*<h4 className="cardItem">{card.description}</h4>*/}
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
};

export default CardList;
