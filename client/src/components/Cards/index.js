import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
// removed CardColumn from bootstrap
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from "../../utils/auth.js";
import { removeCardId } from "../../utils/localStorage";
import { REMOVE_CARD } from "../../utils/mutations";
import "./cards.css";

function Cards() {
  const { loading, data } = useQuery(GET_ME);
  console.log(loading, data);

  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  const [deleteCard, { error }] = useMutation(REMOVE_CARD);
  console.log(error);

  // create function that accepts the card"s mongo _id value as param and deletes the card from the database
  const handleDeleteCard = async (cardId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteCard({
        variables: { cardId: cardId },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }

      // upon success, remove card"s id from localStorage
      removeCardId(cardId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn"t here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

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
          <div className="CardColumns">
            {/* changed CardColumns to a classname */}
            <div className="container cardContainer">
              {/* {id, link, title, description} */}
              {userData?.cards?.map((card) => {
                return (
                  <Card key={card._id} border="dark">
                    {/*ONLY USE IF WE USE IMAGES {card.image ? <Card.Img src={card.image} alt={`The cover for ${card.title}`} variant="top" /> : null} */}
                    <Card.Body>
                      <Card.Title>{card.title}</Card.Title>{" "}
                      <a href={card.link} className="btn cardItem">
                        Click me
                      </a>
                      <Card.Text>{card.description}</Card.Text>
                      <Button
                        className="btn-block btn-danger"
                        onClick={() => handleDeleteCard(card._id)}
                      >
                        Delete this Card!
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}
            </div>
          </div>
          {/* </CardColumns> */}
        </section>
      </Container>
    </>
  );
}

export default Cards;

//     <div className='mapContainer'>
//     <h3>{title}</h3>
//     <div className='cardContent'>

//     <article key={id} className='cardItem'>
//     <h4 className='cardItem'>{description}</h4>
//     <div className='cardItem cardItem-btn'>
//     <a href={link} className='btn cardItem'>Link</a>
//     </div>
// </article>
// </div>
// </div>
