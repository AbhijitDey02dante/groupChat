const url = "http://localhost:3000";

const nameId=document.querySelector('#name');
const email=document.querySelector('#email');
const mobile=document.querySelector('#mobile');
const password=document.querySelector('#password');
const cPassword=document.querySelector('#cPassword');
const confirmPasswordText = document.querySelector('#confirmPasswordText');
const  submitButton= document.querySelector('#submitButton');
const submitMessage=document.querySelector('#submitMessage');
const form=document.querySelector('.signupForm');

// JAVSCRIPT CONFIRM PASSWORD VALIDATION
cPassword.addEventListener('keyup',()=>{
    if(password.value.length>0 && cPassword.value===password.value){
        confirmPasswordText.classList.add('active');
        confirmPasswordText.innerText='Password matched';
        submitButton.disabled=false;
    }
    else
    {
        confirmPasswordText.classList.remove('active');
        confirmPasswordText.innerText='Password not matched';
        submitButton.disabled=true;
    }
})

password.addEventListener('keyup',()=>{
    if(cPassword.value.length>1 && cPassword.value===password.value){
        confirmPasswordText.classList.add('active');
        confirmPasswordText.innerText='Password matched';
        submitButton.disabled=false;
    }
    else if(cPassword.value.length==0)
    {
        confirmPasswordText.innerText='';
        submitButton.disabled=true;
    }
    else{
        confirmPasswordText.classList.remove('active');
        confirmPasswordText.innerText='Password not matched';
        submitButton.disabled=true;
    }
})
// *************************************************************************

// Sending form(************************************************************)
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const obj={
        name:nameId.value,
        email:email.value,
        mobile:mobile.value,
        password:password.value
    }
    axios.post(`${url}/addUser`,obj)
    .then((result)=>{
        submitMessage.innerText='User registered';
        setTimeout(()=>{
            submitMessage.innerText='';
        },3000);
    })
    .catch((error)=>{
        console.log(error);
        submitMessage.innerText='Account already registered with the same email';
        setTimeout(()=>{
            submitMessage.innerText='';
        },3000);
    })
})