import React from 'react';
import { TextField, Paper, Button, Grid } from '@mui/material';

class AddTodo extends React.Component{

    constructor(props){
        super(props);
        this.state = { item : { title : "" } };
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
        this.add(this.state.item);
        this.setState({item: {title: ""} });
    };//func


    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter'){ this.onButtonClick(); }
    };//func




    render(){
        return(
            <Paper style={ {margin:16, padding: 16} } >
                <Grid container >
                    <Grid xs={10.5} md={10.5} item style={{ paddingRight:10 }}>
                        <TextField
                            placeholder='Add Todo here'
                            fullWidth
                            onChange={this.onInputChange}
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler}
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button fullWidth
                            color="secondary"
                            variant="outlined"
                            size="large"
                            onClick = {this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );//return
    }//render

}//end of class

export default AddTodo;