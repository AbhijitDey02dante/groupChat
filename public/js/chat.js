const url = "http://localhost:3000";

let userName;
// Authenticate if logged in 
const token=localStorage.getItem('tokenKey');
configToken = {
    headers: {
       Authorization: "Bearer " + token
    }
}

axios.get(`${url}/verify`,configToken)
.then((result)=>{
    userName=result.data.name;
})
.catch((error)=>{
    window.location='login.html';
})


const form=document.querySelector('.msgForm form')
const message=document.querySelector('#message');
const chatList=document.querySelector('#chatList');


document.addEventListener('DOMContentLoaded',()=>{
    axios.get(`${url}/allMessages`,configToken)
    .then((result)=>{
        addMessageList(result.data);
        
        const li=document.createElement('li');
        li.innerText=`You Joined`;
        chatList.appendChild(li);
    })
    .catch((error)=>{
        console.log(error);
    })
})

//send messages**************************************
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg={message:message.value};
    message.value='';
    axios.post(`${url}/sendMessage`,msg,configToken)
    .then((result)=>{
        addMessage([result.data],'You');
    })
    .catch((error)=>{
        console.log(error);
    })
})

//add new message to the UI***************************************
const addMessage = (result,sender)=>{
    result.forEach((user)=>{
        const li=document.createElement('li');
        li.innerText=`${sender}: ${user.message}`;
        li.id=`id${user.id}`;
        chatList.appendChild(li);
    })
}

//add previous message to the UI**************************************
const addMessageList = (result)=>{
    result.forEach((element)=>{
        let sender;
        if(userName===element.user.name){
            sender='You';
        }
        else{
            sender=element.user.name;
        }
        addMessage([element],sender);
    });
}