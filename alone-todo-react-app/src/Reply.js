import React from 'react';
import {
    ListItem,
    ListItemText,
    InputBase,
    Button,
    ListItemSecondaryAction
} from "@mui/material";


class Reply extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            replyItem : props.replyItem,
            readOnly: true
        };//this.state

        this.deleteReply = props.deleteReply;//이놈은 어떤 상위객체로부터 전달을 받아야 하는가?
        this.updateReplyCallLast = props.updateReplyCallLast;
    }//constructor

    //>>> Method Area <<<


    deleteEventHandler = () => {
        console.log("delete reply event called");
        this.deleteReply(this.state.replyItem);
    };


    offReadOnlyMode = () => {
        console.log("current Reply readOnly : ", this.state.readOnly);
        this.setState(
            {readOnly:false},
            () => {
                console.log("read Only ? : ", this.state.readOnly);
            }
        );
    };//func

    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter'){
            this.setState( { readOnly: true } );
            console.log(this.state.replyItem);
            this.updateReplyCallLast(this.state.replyItem);
        }
    };


    editEventHandler = (e) => {
        const thisReply = this.state.replyItem;
        thisReply.title = e.target.value;
        this.setState( {replyItem: thisReply} );
    };//func



    render(){

        console.log("\tReply.js render called");

        const replyItem = this.state.replyItem;

        return(
            <ListItem>
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label":"naked" }}
                        type="text"
                        id={replyItem.id}
                        name={replyItem.id}
                        value={replyItem.title}
                        fullWidth={true}
                        onClick = {this.offReadOnlyMode}
                        onChange={
                            this.editEventHandler
                        }
                        onKeyPress={
                            this.enterKeyEventHandler
                        }
                        placeholder="edit :)"
                    />

                    <ListItemSecondaryAction>
                        <Button
                            color="secondary"
                            variant="text"
                            aria-label="Delete Todo"
                            size="small"
                            onClick={
                                this.deleteEventHandler
                            }
                        >
                            X
                        </Button>
                    </ListItemSecondaryAction>
                </ListItemText>
            </ListItem>
        );//return
    }//render

}//end of class

export default Reply;