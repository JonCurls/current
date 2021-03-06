import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { SAVE_CARD } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { saveCardIds, getSavedCardIds } from "../../utils/localStorage";
import "./create.css";

//Create a new card
function Create() {
  // create state for holding returned api data
  const [createdCards, setCreatedCards] = useState([]);
  // create state for holding our input field data
  const [createTitle, setCreateTitle] = useState("");
  const [createLink, setCreateLink] = useState("");
  const [createDescription, setCreateDescription] = useState("");

  // create state to hold saved cardId values
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());

  // set up useEffect hook to save `savedCardIds` list to localStorage on component unmount
  useEffect(() => {
    return () => saveCardIds(savedCardIds);
  });
  // create method to create cards and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!createTitle && !createDescription && !createLink) {
      return false;
    }

    try {
      const { data } = await saveCard({
        variables: {
          title: createTitle,
          link: createLink,
          description: createDescription,
        },
      });
      console.log(data);

      if (error) {
        throw new Error("something went wrong!");
      }

      // if card successfully saves to user's account, save card id to state
      setSavedCardIds([...savedCardIds, data.addCard._id]);
    } catch (err) {
      console.error(err);
    }
  };

  const [saveCard, { error, data }] = useMutation(SAVE_CARD);
  console.log(error, data);

  // create function to handle saving a card to our database
  const handleSaveCard = async (cardId) => {
    // find the card in `createdCards` state by the matching id
    const cardToSave = createdCards.find((card) => card.cardId === cardId);
    console.log(cardToSave);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    console.log(token);
    try {
      await saveCard({
        variables: { input: cardToSave },
      });

      if (error) {
        throw new Error("something went wrong!");
      }

      // if card successfully saves to user's account, save card id to state
      setSavedCardIds([...savedCardIds, cardToSave.cardId]);
    } catch (err) {
      console.error(err);
    }
    console.log(handleSaveCard);
  };
  return (
    <>
      <section id="create">
        <h1>Create your Cards!</h1>
        <form onSubmit={handleFormSubmit}>
          <Row>
            <Col className="formElement">
              <Form.Control
                name="title"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
                type="text"
                size="lg"
                placeholder="Title your card"
              />
            </Col>
            <Col className="formElement">
              <Form.Control
                name="link"
                value={createLink}
                onChange={(e) => setCreateLink(e.target.value)}
                type="text"
                size="lg"
                placeholder="Link your Card"
              />
            </Col>
            <Col className="formElement">
              <Form.Control
                name="description"
                value={createDescription}
                onChange={(e) => setCreateDescription(e.target.value)}
                type="text"
                size="lg"
                placeholder="Describe your Card"
              />
            </Col>

            <Col className="formElement">
              <Button
                className="btn btn-primary"
                type="submit"
                variant="success"
                size="lg"
              >
                Submit Card
              </Button>
            </Col>
          </Row>
        </form>
      </section>
      <Container>
        <h2>
          {createdCards.length
            ? `Viewing ${createdCards.length} results:`
            : ""}
        </h2>
        <div className="CardColumns">
          {createdCards.map((card) => {
            return (
              <Card key={card.cardId} border="dark">
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <p className="small">Title: {card.title}</p>
                  <Card.Text>{card.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedCardIds?.some(
                        (savedCardId) => savedCardId === card.cardId
                      )}
                      className="btn btn-primary"
                      onClick={() => handleSaveCard(card.cardId)}
                    >
                      {savedCardIds?.some(
                        (savedCardId) => savedCardId === card.cardId
                      )
                        ? "This card has already been saved!"
                        : "Save this Card!"}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </div>
      </Container>
    </>
  );
}

export default Create;
