const url = "http://localhost:3000";

let currentId;
let storedGroupMessage=[];
let messageGroupCount=0;
// Authenticate if logged in 
const token=localStorage.getItem('tokenKey');
configToken = {
    headers: {
       Authorization: "Bearer " + token
    }
}
const currentUrl = window.location.href;
const groupId = currentUrl.substring(currentUrl.lastIndexOf('=')+1);

axios.get(`${url}/verify`,configToken)
.then((result)=>{
    currentId=result.data.id;
})
.catch((error)=>{
    window.location='login.html';
})
let userCheck;

const form=document.querySelector('.msgForm form')
const message=document.querySelector('#message');
const chatList=document.querySelector('#chatList');

document.addEventListener('DOMContentLoaded',()=>{
    userCheck=localStorage.getItem('user');
    if(localStorage.getItem(`storedGroupMessage${groupId}`))
    {
        storedGroupMessage=JSON.parse(localStorage.getItem(`storedGroupMessage${groupId}`));
        addMessageList(storedGroupMessage);
    }
    if(localStorage.getItem(`messageGroupCount${groupId}`))
    {
        messageGroupCount=localStorage.getItem(`messageGroupCount${groupId}`);
    }
    // update();
})

// side Menu to add user in group
const messageAdded=document.querySelector('.messageAdded');
const settingBtn=document.querySelector('.setting');
const menuWindow=document.querySelector('.fullMenu');
const addUserGroupForm = document.querySelector('.fullMenu form');
const email=document.querySelector('#addUser');

settingBtn.addEventListener('click',()=>{
    menuWindow.style.transform=`translateY(0)`;
})
menuWindow.addEventListener('click',(e)=>{
    if(e.target.className==='fullMenu'){
        menuWindow.style.transform=`translateY(100%)`;
    }
})

addUserGroupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    axios.post(`${url}/addUserToGroup`,{email:email.value, groupId:groupId},configToken)
    .then((result)=>{
        messageAdded.innerText=`Added ${result.data.name} to the group`;
        setTimeout(()=>{
            messageAdded.innerText=``;
        },3000);
    })
    .catch((error)=>{
        messageAdded.innerText=`Mail added or incorrect`;
        setTimeout(()=>{
            messageAdded.innerText=``;
        },3000);
        console.log(error);
    })
})


//send messages**************************************
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg={
        message:message.value,
        userId:groupId
    };
    message.value='';
    axios.post(`${url}/sendGroupMessage`,msg,configToken)
    .then((result)=>{
        // console.log(result);
        // addMessage([result.data],'You');
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
        if(element.user.id!= userCheck){
            sender=element.user.name;
         }
        else{
            sender=`You`;
        }
        addMessage([element],sender);
    });
}

// make the application realtime******************************************
// use setTimeInterval(() =>. call Api , 1000)
const update=()=>{
    //update the list
    axios.get(`${url}/allGroupMessages?headerMessage=${messageGroupCount}&groupMessage=${groupId}`,configToken)
    .then((result)=>{
            // clear the list
            // const item=document.querySelectorAll('#chatList li');
            // item.forEach((element)=>element.remove());
            const resultData=result.data;
            storedGroupMessage=[...storedGroupMessage, ...resultData];
            messageGroupCount= +messageGroupCount + +result.data.length;

            const diff=storedGroupMessage.length-100;
            if(diff>0)
            {
                console.log(storedGroupMessage.length);
                storedGroupMessage=storedGroupMessage.splice(diff);
                console.log(storedGroupMessage);
                console.log(diff);
            }
            localStorage.setItem(`storedGroupMessage${groupId}`,JSON.stringify(storedGroupMessage));
            localStorage.setItem(`messageGroupCount${groupId}`,messageGroupCount);

            if(result.data.length>0)
                addMessageList(result.data);

            // console.log(storedGroupMessage,result.data);
            // console.log(messageGroupCount);
    })
    .catch((error)=>{
        console.log(error);
    })
}

setInterval(()=>{
    update();
},1000);