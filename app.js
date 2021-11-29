
function post(){
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    axios.post("localhost:3000/user",{
        userNmae:userName,email:email

    })   
    .then((response)=>{
        console.log(response);
        alert('successFully response')
        document.getElementById("userName").value=''
        document.getElementById("email").value=''
    })
    .catch((error)=>{
        console.log(error);
        alert("notResponding")
    })
}