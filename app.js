function abc(){
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    axios.post("https://crud-appo.herokuapp.com/user",{
        userNmae:userName,email:email

     
    })
        .then((response)=>{
            console.log(response);
            alert('successFully response')
            document.getElementById("userName").value='';
            document.getElementById("email").value='';
            
        })
        .catch((error)=>{
            alert("not Responding")
            console.log(error);
        })
    
}
function cba(){
    
    axios.get("https://crud-appo.herokuapp.com/users")
    .then((response)=>{
        console.log(response);
        response.data.forEach((data)=> {
            var saveDAta = `
            <tr id="${data.userName}">
            <td></td></tr>
            `
    document.getElementById("tblper").innerHTML += saveDAta;
            console.log(data)
            
        });
    })
    .catch((err)=>{
console.log(err)
    })
    .then(()=>{
        // always exicuted
    })
}
