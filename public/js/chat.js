const url = "http://localhost:3000";

let userName;
let NoOfMessages;
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
        NoOfMessages=result.data.length;
        addMessageList(result.data);

        // const li=document.createElement('li');
        // li.innerText=`You Joined`;
        // chatList.appendChild(li);
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

// make the application realtime******************************************
// use setTimeInterval(() =>. call Api , 1000)
const update=()=>{
    //update the list
    axios.get(`${url}/allMessages`,configToken)
    .then((result)=>{
        if(NoOfMessages<result.data.length){
            // clear the list
            const item=document.querySelectorAll('#chatList li');
            item.forEach((element)=>element.remove());
            addMessageList(result.data);
            NoOfMessages=result.data.length;
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

setInterval(()=>{
    update();
},1000);