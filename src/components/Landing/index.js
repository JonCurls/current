import React from 'react';
import './landing.css'

function Landing(){
    return(
        <section id="landing">
            <div class="container buttonContainer">
            <button type='submit' className='btn btn-primary'>Log in</button>
            <button type='submit' className='btn btn-primary'>Sign Up</button>
            </div>

        </section>
    )
}

export default Landing;