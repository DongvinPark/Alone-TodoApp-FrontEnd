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
            /*replies:props.item.replies 이 부분 매우 중요하다!! 댓글들도 결국은 App.js의 items 배열 내부 요소일 수밖에 없다는 사실을 기억히야 한다!!*/
            replies:props.item.replies };//this.state
        this.delete = props.delete;
        this.updateTodo = props.updateTodo;
        this.addReplyCall = props.addReplyCall;
        this.updateReplyCall = props.updateReplyCall;
        this.deleteReplyCall = props.deleteReplyCall;
        this.get = props.get;
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

            console.log("Todo enterKeyEventHandler called : ", this.state.item);
            //call updateTodo method from App.js
            this.updateTodo(this.state.item);
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

        //call updateTodo method from App.js
        this.updateTodo(this.state.item);
    };//func



    //렌더링 된 프런트 엔드에서 '댓글'이라고 써 있는 버튼을 눌렀을 때, 이 함수가 호출된다.
    //그러고 나서 무슨 일이 일어나는가? 우선 첫째로 프런트엔드 상에서의 Todo 아이템에 변화가 생긴다.
    //또한 Back End에 있는 /Todo/makeReply 라는 url을 인자로 받는 컨트롤러 메서드를 호출해야 한다.
    addReply = () => {

        //console.log("*** Todo.js addReply entered");
        
        this.addReplyCall(this.state.item);

        //console.log("*** Todo.js result of this.state.replies : ", this.state.replies);
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
        //console.log("resetDate() called");
        
        const thisItem = this.state.item;
        //console.log("before reset date : ", thisItem.dueDate);
        
        var dDay = document.getElementById("D-Day-Date").value;
        //console.log("dDay value : ", dDay);
        
        thisItem.dueDate = dDay;
        //console.log("after reset date : ", thisItem.dueDate);
        
        this.setState({ item: thisItem });
        //console.log("final : ", this.state.item);

        this.updateTodo(this.state.item);
    };//func




    //d1 == dueDate == D-Day-Date == 디데이
    //자바스크립트에서는 dueDate에 대하여 항상 오전 09:00:00:000의 기준을 적용시킨다.
    //예를 들면, dueDate가 2022-06-29 라면, dueDate는 2022-06-29:09:00:00:000인 것이다.
    //하지만 이것은 디데이를 오늘로 설정하는 경우에 문제가 생긴다. 오전 9시 이전에 디데이를 오늘로 설정하면, 밀리초로 표현한 시간차이가 음수가 되고, 9시 이후부터 23:59:59:999이전에 설정할 경우 밀리초로 표현한 시간 차이가 0밀리초 ~ 53,999,999밀리초의 값을 가지기 때문이다.
    //따라서 dueDate 즉, 디데이에 대해서 13시간 59분 59초 999밀리초를 밀리초로 환산한 값(53_999_999밀리초와 같음)을 더하여, 디데이를 오늘로 설정한 경우에 실제로 남은 시간이 오늘 23시 59분 59초 999밀리초를 기준으로 계산될 수 있도록 한다.
    getLeftDays = (d1, d2) => {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        
        //console.log("d Day : ", date1);
        //console.log("today : ", date2);

        /* 53,999,999 밀리초는 { 23시 59분 59초 999밀리초 - 09시간 00분 00초 00밀리초} 라는 값을 밀리초로 환산한 값다. */
        var diffDate = (date1.getTime()+(53_999_999)) - date2.getTime();

        //console.log("mil/s difference : ", diffDate);

        //디데이를 '오늘'로 설정한 경우다. 남은 시간이 밀리초 기준으로 당연히 (1000밀리초 * 60초 * 60분 * 24시간 == 86_400_000밀리초보다 적을 수밖에 없다.)
        if(diffDate < 86_400_000 && diffDate >=0) {
            console.log("if entered");
            return 0;
        }

        else if(diffDate < 0){
            return diffDate;
        }

        //디데이가 오늘보다 나중의 날짜로 설정된 경우를 계산하기 위한 변수다.
        var timer = 0;

        //diffDate는 설정해 놓은 디데이 날짜와 지금 시각 사이의 차이를 밀리초로 표현한 값이다. 여기서 1일을 뜻하는 (86_400_000)밀리초를 몇 번 뺐는지를 구하면 몇 일이 지나야 디데이에 도달하는 지를 구할 수 있다.
        while(true){
            //console.log("resetDate while called");
            diffDate -= (86_400_000);
            timer += 1;
            if(diffDate < 86_400_000){break;}
        }//

        return timer;
      };//func




    render(){

        //console.log("\tTodo.js render called");

        const item = this.state.item;

        var todoReplies = this.state.replies.length > 0 && (
            <Paper style={ { paddingLeft:10 } }>
                <List>
                    {
                        this.state.replies.map(
                            (replyItem,idx) => (<Reply
                                                    replyItem={replyItem}
                                                    key={replyItem.id} 
                                                    deleteReply = {this.deleteReply}
                                                    updateReplyCallLast = {this.updateReplyCall}
                                                    deleteReplyCallLast = {this.deleteReplyCall}
                                                />)
                        )//map
                    }
                </List>
            </Paper>
        );//todoReplies

        var leftDays;
        var failed="";
        if(item.dueDate === ""){
            leftDays = "??";
        }
        else{
            leftDays = this.getLeftDays(this.state.item.dueDate, Date.now());
            if(leftDays < 0){
                leftDays = 0;
                failed = "기한을 넘겼어요ㅠㅠ";
            }   
        }

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
                        <Grid item xs={6}>
                            기한 : {this.state.item.dueDate}
                        </Grid>
                        <Grid item xs={4}>
                            {leftDays} 일<br/>남음
                        </Grid>
                        <Grid>
                            {failed}
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