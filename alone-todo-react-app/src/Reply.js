import React from 'react';
import {
    ListItem,
    ListItemText,
    InputBase,
    ListItemSecondaryAction,
    IconButton
} from "@mui/material";
import { DeleteOutlined } from "@mui/icons-material";

class Reply extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            replyItem : props.replyItem,
            readOnly: true
        };//this.state

        this.deleteReply = props.deleteReply;//이놈은 어떤 상위객체로부터 전달을 받아야 하는가?
    }//생성자

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
        }
    };


    editEventHandler = (e) => {
        const thisReply = this.state.replyItem;
        thisReply.title = e.target.value;
        this.setState( {replyItem: thisReply} );
    };//func



    render(){
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
                        //fullwidth={true}
                        onClick = {this.offReadOnlyMode}
                        onChange={
                            this.editEventHandler
                        }
                        onKeyPress={
                            this.enterKeyEventHandler
                        }
                    />

                    <ListItemSecondaryAction>
                        <IconButton
                            aria-label="Delete Todo"
                            onClick={
                                this.deleteEventHandler
                            }
                        >
                            <DeleteOutlined />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItemText>
            </ListItem>
        );//return
    }//render

}//end of class

export default Reply;