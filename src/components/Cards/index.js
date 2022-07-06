import React from 'react';
import './cards.css';

const card = [
    {
        id: 1,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    },
    {
        id: 2,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    },
    {
        id: 3,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    },
    {
        id: 4,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    },
    {
        id: 5,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    },
    {
        id: 6,
        link: 'google.com',
        title: 'First Card',
        description: 'a summary of the card'
    }
]

function Cards(){
    return(
        <section id="cards">
        <h2>My Cards</h2>

        <div className='container cardContainer'>
            {
                card.map(({id, link, title, description}) => {
                    return(
                        <div className='mapContainer'>
                        <h3>{title}</h3>
                        <div className='cardContent'>
                        
                        <article key={id} className='cardItem'>    
                        <h4 className='cardItem'>{description}</h4>
                        <div className='cardItem cardItem-btn'>
                        <a href={link} className='btn cardItem'>Link</a>
                        </div>
                    </article>
                    </div>
                    </div>
                    )
                })
            }
        </div>
        </section>
    )
}

export default Cards;