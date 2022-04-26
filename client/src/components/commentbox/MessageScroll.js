import React from 'react';
import Message from './Message/Message';
function MessageScroll(props) {
   const {comments}= props;
   
    return (  
        <>{
            comments ==null ?    <div className="bottomBar">
            <div className="loader">

            </div>
        </div> :<div>
        {comments.map((comment) => (  
             <Message user="Prince" editable={false} Message={comment.description} likes="25" /> 
           ))}  
        </div>
        }
         
            
    
        </>
    );
}

export default MessageScroll;