import React, { useState, useEffect } from 'react';
import { Container, Button, Card, CardColumns } from 'react-bootstrap'
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import Auth from '../../utils/auth.js';
import { removeCardId } from "../../utils/localStorage";
import { REMOVE_CARD } from "../../utils/mutations";
import './cards.css';

//overall not necesarry
// const cardSeed = [
//     {
//         id: 1,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     },
//     {
//         id: 2,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     },
//     {
//         id: 3,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     },
//     {
//         id: 4,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     },
//     {
//         id: 5,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     },
//     {
//         id: 6,
//         link: 'google.com',
//         title: 'First Card',
//         description: 'a summary of the card'
//     }
// ]

function Cards() {

    const { loading, data } = useQuery(GET_ME)
    console.log(loading, data)

    const userData = data?.me || [];

    // use this to determine if `useEffect()` hook needs to run again
    const userDataLength = Object.keys(userData).length;
    useEffect(() => {
        const getUserData = async () => {
            try {
                const token = Auth.loggedIn() ? Auth.getToken() : null;

                if (token) {
                    return;
                }

                //TODO this definetly needs to be a gql
                const getMe = (token) => {
                    return fetch('/api/users/me', {
                      headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`,
                      },
                    });
                  };

                const response = await getMe(token);

                if (!response.ok) {
                    throw new Error("Something went wrong!");
                }

                const user = await response.json();
                console.log(user);
                //setUserData(user); < THis just creates an infinite recursive function

            } catch (err) {
                console.error(err);
            }
        };
        getUserData();
    },
        [userDataLength]
    );

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
                variables: { cardId: cardId }
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
                    {userData.savedCards.length
                        ? `Viewing ${userData.savedCards.length} saved ${userData.savedCards.length === 1 ? "card" : "cards"}:`
                        : 'You have no saved cards!'}
                </h2>
                <CardColumns>
                    <div className='container cardContainer'>
                        {/* {id, link, title, description} */}
                        {userData.savedCards.map((card) => {
                            return (
                                <Card key={card.cardId} border="dark">
                                    {/*ONLY USE IF WE USE IMAGES {card.image ? <Card.Img src={card.image} alt={`The cover for ${card.title}`} variant="top" /> : null} */}
                                    <Card.Body>
                                        <Card.Title>{card.title}</Card.Title>
                                        <p className="small">Link: {card.title}</p>
                                        <Card.Text>{card.description}</Card.Text>
                                        <Button className="btn-block btn-danger" onClick={() => handleDeleteCard(card.cardId)}>
                                            Delete this Card!
                                        </Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </div>
                </CardColumns>
            </section>
        </Container>
        </>
    );
};

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