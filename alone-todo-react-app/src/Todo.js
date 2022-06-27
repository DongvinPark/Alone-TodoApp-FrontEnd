import React from 'react';
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton,
    Paper,
    List,
    Button,
    Grid
    } from "@mui/material";
import { DeleteOutlined } from '@mui/icons-material';

import Reply from './Reply';

class Todo extends React.Component{

    constructor(props){
        super(props);
        this.state = { 
            item : props.item,
            readOnly: true,
            replies:[
                //{ id: "0", title:"test reply 01" },
                //{ id: "1", title:"test reply 02" }
            ] };//this.state
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



    addReply = (replyToInsert) => {
        const thisReplyItem = this.state.replies;

        replyToInsert = { id: "", title:"" };

        replyToInsert.id = "ID-" + thisReplyItem.length;

        //replyToInsert.title =  "click to edit :)";

        thisReplyItem.push(replyToInsert);
        this.setState( { replies:thisReplyItem } );
        console.log("replies : ", this.state.replies);
    };//func



    deleteReply = (replyToDelete) => {
        const thisReplies = this.state.replies;

        console.log("Before delete reply : ", this.state.replies);

        const deletedReply = thisReplies.filter(
            e => e.id !== replyToDelete.id
        );

        this.setState(
            {replies: deletedReply},
            () => {
                console.log("After delete reply : ", this.state.replies)
            }
        );
    };//func


    resetDate = () => {
        console.log("resetDate() called");
        
        const thisItem = this.state.item;
        console.log("before reset date : ", thisItem.dueDate);
        
        var dDay = document.getElementById("D-Day-Date-Edit").value;
        console.log("dDay value : ", dDay);
        
        thisItem.dueDate = dDay;
        console.log("after reset date : ", thisItem.dueDate);
        
        this.setState({ item: thisItem });
        console.log("final : ", this.state.item);
    };//func


    getLeftDays = (d1, d2) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        
        const diffDate = date1.getTime() - date2.getTime();
        
        const leftDaysInMilSec = Math.abs(diffDate / (1000 * 60 * 60 * 24)); // 밀리초 * 초 * 분 * 시 = 일

        console.log(leftDaysInMilSec);

        const leftDaysInteger = Math.ceil( leftDaysInMilSec );
        
        if(leftDaysInMilSec < 1) {
            console.log("if entered");
            return 0;
        }
        
        else return leftDaysInteger;
      };//func


    render(){
        const item = this.state.item;

        var todoReplies = this.state.replies.length > 0 && (
            <Paper style={ { paddingLeft:10 } }>
                <List>
                    {
                        this.state.replies.map(
                            (replyItem,idx) => (<Reply replyItem={replyItem} key={replyItem.id} 
                            deleteReply = {this.deleteReply}
                            />)
                        )//map
                    }
                </List>
            </Paper>
        );//todoReplies

        var leftDays = this.getLeftDays(this.state.item.dueDate, Date.now());

        

        return(
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
                    
                <Grid>
                    <Grid item xs={12}>
                        <Button
                            color="secondary"
                            variant="text"
                            size="small"
                            onClick={this.resetDate}
                        >
                            디데이<br/>수정
                </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color = "success"
                            variant="text"
                            size="small"
                            onClick = {this.addReply}
                        >
                            댓글
                        </Button>
                    </Grid>
                </Grid>
                

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
                        placeholder=">>> click to edit"
                    />

                    <Grid container>
                        <Grid item xs={5}>
                            {leftDays} 일<br/>남음
                        </Grid>
                        <Grid item xs={5}>
                            {<input type="date" id="D-Day-Date-Edit"/>}
                        </Grid>
                    </Grid>
                    <Grid>
                        {todoReplies}
                    </Grid>

                </ListItemText>
                

                <ListItemSecondaryAction >
                    
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