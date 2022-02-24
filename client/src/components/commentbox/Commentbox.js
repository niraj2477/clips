import React,{useRef, useState} from 'react';
import '../commentbox/commentbox.css'
import {useOpenReply} from './Message/Message';

function Commentbox(props) {


    const changeOpenReply = useOpenReply();

    const message = useRef(null);
    //the underline animation
    const [showCommentLine, setCommentLine]=useState(false);
    //true on focous
    const [showButtons, setShowButtons] = useState(false); 
    // input on blank
    const[enableBtn, setEnableBtn]= useState(true);

    const commentFocus = () => {
        setCommentLine(true);
        setShowButtons(true);
    }

    const commentFocusOut = () => {
        setCommentLine(false);
    }

    const commentStoke = event =>{
        let currMessage = event.target.value;
        if(currMessage){
            setEnableBtn(false);
        }else{
            setEnableBtn(true);
        }
    }

    //send comment
    const sendComment = (event) =>{
        event.preventDefault();
    }




    return (  
        <form>
            <section>
            <input 
                autoFocus={props.autoFocus}
                type="text"
                placeholder="Add a public comment........."
                ref={message}
                onFocus={commentFocus}
                onBlur={commentFocusOut}
                onKeyUp={commentStoke}
            />
            {/*Under line begains here*/}
            {showCommentLine && <div className="commentline"></div>}
            </section>
            {showButtons && (
                <>
                <button className="commentButton sendButton" disabled={enableBtn} onClick={sendComment}>COMMENT</button>
                <button className="commentButton" style={{color:"gray", backgroundColor:"transparent"}}   
                onClick={() => {
                    setShowButtons(false);
                    changeOpenReply()
                }}> CANCEL </button>
                </>
            )}
        </form>
    );
}

export default Commentbox;