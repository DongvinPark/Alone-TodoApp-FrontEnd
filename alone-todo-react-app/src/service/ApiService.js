import { API_BASE_URL } from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";


export function call(api, method, request){
    let headers = new Headers( { "Content-Type":"application/json", } );

    const accessToken = localStorage.getItem( "ACCESS_TOKEN" );
    if( accessToken && accessToken !== null ){
        headers.append( "Authorization", "Bearer " + accessToken );
    }

    let options = {
        //headers: new Headers({ "Content-Type" : "application/json", }),
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };//options

    if(request){
        options.body = JSON.stringify(request);
    }//if

    return fetch(options.url, options).then(
        (response) => response.json().then(
            (json) => { if(!response.ok){ 
                console.log("프로미스 거부 파트 진입");
                alert(json.error);
                window.location.reload();
                return Promise.reject(json);
             }//여기 세미콜론 빠졌다!! 그리고 if 다음엔 request가 아니고 response다!!
                return json;
            }//(json) =>
        )//inner then
    )
    .catch(
        (error) => {
            return Promise.reject(error);
        }//error
    );//catch
}//function call()




export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
    .then(
        (response) => {
            if(response.token){ 
                localStorage.setItem("ACCESS_TOKEN", response.token);
                window.location.href = "/";
             }
        }
    );//then()
}//signin()






export function signout(){
    localStorage.setItem(ACCESS_TOKEN, null);
    window.location.href = "/login";
}//signout()





export function signup(userDTO){
    return call("/auth/signup", "POST", userDTO);
}