import React from 'react';
import './card.css';

const card = [
    {
        id: 1,
        link: 'google.com',
        title: 'First Card',
    }
]

function Cards(){
    return(
        <section id="cards">
        <h5>My Cards</h5>

        <div className='container cardContainer'>
            {
                card.map(({id, link, title}) => {
                    return( <article key={id} className='cardItem'>
                        <h3>{title}</h3>
                        <div className='cardItem-btn'>
                        <a href={Link} className='btn'>Link</a>
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