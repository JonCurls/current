import React from 'react';
import './cards.css';

const card = [
    {
        id: 1,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    }
]

function Cards(){
    return(
        <section id="cards">
        <h5>My Cards</h5>

        <div className='container cardContainer'>
            {
                card.map(({id, link, title, description}) => {
                    return( <article key={id} className='cardItem'>
                        <h3>{title}</h3>
                        <h4>{description}</h4>
                        <div className='cardItem-btn'>
                        <a href={link} className='btn'>Link</a>
                        </div>
                    </article>
                    )
                })
            }
        </div>
        </section>
    )
}

export default Cards;