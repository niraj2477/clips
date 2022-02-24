import React from 'react'
import { Dialog,DialogTitle,DialogContent } from '@material-ui/core'

export default function Popup(props){
    const {openPopup,children} =props;
    return(
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>Details </div>
            </DialogTitle>
            <DialogContent>
                <div>{children}</div>
            </DialogContent>
        </Dialog>
    )
}