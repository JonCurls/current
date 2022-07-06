import React from 'react';
import './create.css';

function Create(){
    return(
        <section id="createCard">
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
        </section>
    )
}

export default Create;