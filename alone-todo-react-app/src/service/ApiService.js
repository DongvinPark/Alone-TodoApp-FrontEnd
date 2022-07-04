import { API_BASE_URL } from "../app-config";
//const ACCESS_TOKEN = "ACCESS_TOKEN";


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
            (json) => { if(!response.ok){ return Promise.reject(json); }//여기 세미콜론 빠졌다!! 그리고 if 다음엔 request가 아니고 response다!!
                return json;
            }//(json) =>
        )//inner then
    )
    .catch(
        (error) => {
            console.log(error.status);
            if(error.status === 403){
                window.location.href = "/login";
            }//if
            return Promise.reject(error);
        }//error
    );//catch
}//function call()