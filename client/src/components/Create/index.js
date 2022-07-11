import React, { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card } from "react-bootstrap";
//removed jumbotron and cardcolumns from bootstrap
import { useMutation } from "@apollo/client";
import { SAVE_CARD } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { saveCardIds, getSavedCardIds } from "../../utils/localStorage";
import "./create.css";

//book > card , search > create
//Create a new card
function Create() {
  // create state for holding returned api data
  const [createdCards, setCreatedCards] = useState([]);
  // create state for holding our input field data
  const [createInput, setCreateInput] = useState("");

  // create state to hold saved cardId values
  const [savedCardIds, setSavedCardIds] = useState(getSavedCardIds());

  // set up useEffect hook to save `savedCardIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCardIds(savedCardIds);
  });
  // create method to create cards and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!createInput) {
      return false;
    }

    // try {
    //   const response = await createGqlCard(createInput);

    //   if (!response.ok) {
    //     throw new Error("something went wrong!");
    //   }

    //   const { items } = await response.json();

    //   const cardData = items.map((card) => ({
    //     cardId: card.id,
    //     link: card.link || ["No title to display"],
    //     title: card.title,
    //     description: card.description,
    //     // image: card.volumeInfo.imageLinks?.thumbnail || '',
    //   }));
    //   setCreatedCards(cardData);
    //   setCreateInput("");
    // } catch (err) {
    //   console.error(err);
    // } commented out to run without errors to test

    console.log(handleFormSubmit);
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
      <div fluid className="text-light bg-dark Jumbotron">
        {/* changed Jumbotron to a classname */}
        <Container>
          <h1>Create your Cards!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="title"
                  value={createInput}
                  onChange={(e) => setCreateInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Title your card"
                />
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name="link"
                  value={createInput}
                  onChange={(e) => setCreateInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Link your Card"
                />
              </Col>
              <Col xs={12} md={8}>
                <Form.Control
                  name="description"
                  value={createInput}
                  onChange={(e) => setCreateInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Describe your Card"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </div>
      {/* </Jumbotron> */}

      <Container>
        <h2>
          {createdCards.length
            ? `Viewing ${createdCards.length} results:`
            : "Create a card to begin"}
        </h2>
        <div className="CardColumns">
          {/* changed CardColumns to a classname */}
          {createdCards.map((card) => {
            return (
              <Card key={card.cardId} border="dark">
                {/* {card.image ? (
                                    <Card.Img src={card.image} alt={`The cover for ${card.title}`} variant='top' />
                                ) : null} */}
                <Card.Body>
                  <Card.Title>{card.title}</Card.Title>
                  <p className="small">Title: {card.title}</p>
                  <Card.Text>{card.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedCardIds?.some(
                        (savedCardId) => savedCardId === card.cardId
                      )}
                      className="btn-block btn-info"
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
        {/* </CardColumns> */}
      </Container>
    </>
  );
}

export default Create;

{
  /* <section id="createCard">
<h5>Create a card!</h5>
<h2>Fill in the form to create a card</h2>

<div className='container createContainer'>
    <form>
        <input type='text' name='Title' placeholder='The Title of Your card' required />
        <input type='text' name='Title' placeholder='The link you would like on your card' required />
        <textarea name='description' rows='7' placeholder='describe your card' required></textarea>
        <button type='submit' className='btn btn-primary'>Submit your Card</button>
    </form>
</div>
</section> */
}
