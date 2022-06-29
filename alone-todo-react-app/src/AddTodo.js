import React from 'react';
import { TextField, Paper, Button, Grid } from '@mui/material';


class AddTodo extends React.Component{

    constructor(props){
        super(props);
        this.state = { item : { title : "", dueDate : "" } };
        this.add = props.add;
    }


    //>>> Method Area <<<

    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item: thisItem});
        console.log(thisItem);
    };//func


    onButtonClick = () => {

        var dDay = document.getElementById("D-Day-Date").value;
        
        const thisItem = this.state.item;

        thisItem.dueDate = dDay;

        this.add(this.state.item);
        this.setState({item: {title: "", dueDate: ""} });

       /*  var myDate = document.getElementById("D-Day-Date").value;
        console.log("selected Date : ", myDate);
        console.log(typeof(myDate)); */
    };//func


    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter'){ this.onButtonClick(); }
    };//func




    render(){
        return(
            <Paper style={ {margin:16, padding: 16} } >
                <Grid container >
                    <Grid xs={10.5} md={10.5} item >
                        <TextField
                            placeholder='choose d-day, title :)'
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                            color="secondary"
                            variant="text"
                            size="large"
                            onClick = {this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                    
                </Grid>
                <Grid container>
                    <Grid item xs={3.5}>
                        <br/>
                        {<input type="date" id="D-Day-Date"/>}
                    </Grid>
                    <Grid item xs={8.5}>
                        <br/>
                        {"<<< click to choose date :)"}
                    </Grid>
                </Grid>
            </Paper>
        );//return
    }//render

}//end of class

export default AddTodo;