const url = "http://localhost:3000";


// Authenticate if logged in 
const token=localStorage.getItem('tokenKey');
configToken = {
    headers: {
       Authorization: "Bearer " + token
    }
}

axios.get(`${url}/verify`,configToken)
.then()
.catch((error)=>{
    window.location='login.html';
})

const form=document.querySelector('.msgForm form')
const message=document.querySelector('#message');
const chatList=document.querySelector('#chatList');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const msg={message:message.value};
    message.value='';
    axios.post(`${url}/sendMessage`,msg,configToken)
    .then((result)=>{
        addUser([result.data]);
    })
    .catch((error)=>{
        console.log(error);
    })
})

const addUser = (result)=>{
    result.forEach((user)=>{
        const li=document.createElement('li');
        li.innerText=`You:${user.message}`;
        li.id=`id${user.id}`;
        chatList.appendChild(li);
    })
}