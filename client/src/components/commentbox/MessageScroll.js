import React from 'react';
import Message from './Message/Message';
function MessageScroll(props) {
    return (  
        <>
        <Message user="Prince" editable={false} Message="This is prince" likes="25" />
        <Message user="Prince" editable={false} Message="Price is a good boy" likes="25" />
        <div className="bottomBar">
            <div className="loader">

            </div>
        </div>
        </>
    );
}

export default MessageScroll;