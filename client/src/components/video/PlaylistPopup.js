import React from 'react'
import { Dialog,DialogTitle,DialogContent } from '@material-ui/core'

export default function PlaylistPopup(props){
    const {openPopup,title,children} =props;
    return(
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>{title} </div>
            </DialogTitle>
            <DialogContent>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}