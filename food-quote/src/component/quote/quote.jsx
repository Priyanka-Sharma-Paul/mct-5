import { useState } from 'react';
import './quote.modular.css';

const Quote = (props) => {
   
     return (
        <div className='quoteContainer'>
               <p className='quetes'>
                  {props.data.line}
               </p>
              <p className='author'>
               {props.data.author}
              </p>
        </div>
     );
};

export default Quote;