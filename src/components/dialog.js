import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import withMobileDialog from '@material-ui/core/withMobileDialog';


function Transition(props) {
    return <Slide direction="right" {...props} />;
}

class Modal extends Component {
    render() {
        const { modal_content, is_open, close, fullScreen } = this.props;
        return (
            <Dialog
                    TransitionComponent={Transition}
                    open={is_open}
                    fullScreen={fullScreen}
                    fullWidth={true}
                    maxWidth='xs'
                    onClose={() => close()}
                >
                <IconButton style={{
                   position: 'absolute',
                   right: 10,
                   top: 10
                }} onClick={() => close()} color="inherit" aria-label="Close">
                    <CloseIcon style={{
                        fontSize: '35px',
                    }} />
                </IconButton>
                <br/>
                <DialogContent>
                    { modal_content }
                </DialogContent>
            </Dialog>
        )
    }
}

export default withMobileDialog({breakpoint: 'xs'})(Modal)