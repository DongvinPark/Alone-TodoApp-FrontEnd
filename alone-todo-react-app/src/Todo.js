import React from 'react';
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
    } from "@mui/material";
import { DeleteOutlined } from '@mui/icons-material';

class Todo extends React.Component{

    constructor(props){
        super(props);
        this.state = { item : props.item, readOnly: true };
        this.delete = props.delete;
    }

    //>>> Method Area <<<

    deleteEventHandler = () => {
        console.log("delete Event Handler called");
        this.delete(this.state.item);
    };//func


    offReadOnlyMode = () => {
        console.log("Read Only Mode status : ", this.state.readOnly);
        this.setState(
            {readOnly:false}, ()=>{ console.log("read only ? : ", this.state.readOnly) }
        );//setState
    };//func
    

    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter'){
            this.setState( { readOnly: true } );
        }
    };//func


    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
    };//func


    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState( { item: thisItem } );
    };//func




    render(){
        const item = this.state.item;

        return(
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
                <ListItemText>
                    <InputBase
                        inputProps={ {"aria-label": "naked"} }
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        //multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>

            </ListItem>
        );//return

    }//render

}//end of class

export default Todo;

/*
머티러얼 UI 사용 전에 입력했었던 내용들
        return(
            <div className="Todo">
                <input
                    type="checkbox"
                    id={this.state.item.id}
                    name={this.state.item.id}
                    checked={this.state.item.done}
                />
                <label id={this.state.item.id}>{this.state.item.title}</label>
            </div>
        );//return
*/