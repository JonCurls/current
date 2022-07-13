import React, { useState, useEffect } from "react";
import { Container, Button, Card } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, GET_USER } from "../../utils/queries";
import Auth from "../../utils/auth.js";
import { removeCardId } from "../../utils/localStorage";
import { REMOVE_CARD } from "../../utils/mutations";
import { AiFillDelete } from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { Link } from "react-router-dom";
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
    console.log(error);

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
      console.log(error);
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
}

export default Cards;
