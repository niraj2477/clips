import React,{useRef, useState} from 'react';
import '../commentbox.css'
import { useCookies } from "react-cookie";
import { addComment } from '../../../apis/Comment';
function Topcommentbox(props) {
    const [cookie] = useCookies(["id"]);
    const {video} = props;
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
        console.log(video);
        console.log(cookie);
        
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
        console.log(message.current.value);

        let data={"video":video._id,"userId":cookie.id,message:message.current.value};
        addComment(data).then((result)=>{
            console.log(result);
        });
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
                    message.current.value = ""
                }}> CANCEL </button>
                </>
            )}
        </form>
    );
}

export default Topcommentbox;