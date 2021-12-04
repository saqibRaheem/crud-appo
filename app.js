// import axios from "axios";
// const axios = require("axios");

// const { default: axios } = require("axios");
// const { response } = require("express");

// const port = 'http://localhost/3000'
// const port = "";
function abc() {
    let userName = document.getElementById('userName').value;
    let email = document.getElementById('email').value;
    axios.post('https://crud-appo.herokuapp.com/user', {
        userName: userName, email: email


    })
        .then((response) => {
            console.log(response);
            alert('successFully response')
            document.getElementById("userName").value = '';
            document.getElementById("email").value = '';
            cba();

        })
        .catch((error) => {
            alert("not Responding")
            console.log(error);
        })

}
function cba() {
    axios.get('https://crud-appo.herokuapp.com/users')


        .then((response) => {
            console.log(response);
            response.data.forEach((data) => {
                var saveDAta = `
            <tr id="${data_id}">
            <td id="userName_">${data.userName}</td>
            <td id="email_">${data.email}</td>
            <td><button href="javascript:void(0)" onclick=get_record("${data.userName}","${data.email}","${data._id}");id="edit">EDIT</td>
            <td><button href="javascript:void(0)" onclick=delet_data("${data._id}"); id="delete">DELETE</td>
            </tr>
            `
                document.getElementById("tblper").innerHTML += saveDAta;
                console.log(saveDAta)

            });
        })
        .catch((err) => {
            console.log(err)
        })
        .then(() => {
            // always exicuted
        })
}
function get_record(userName_, email_, _id) {
    // document.getElementById('userName').value= e.userName;
    // let id = e._id;
    // let email =e.email;
    // let address = e.address;

    // console.log("yar check karo"+userName, user_id, id, document.getElementById('userName_' + id));
    console.log(userName_);
    console.log(email_);
    console.log(_id);
    console.log("kuch nhi");
    document.getElementById(_id).innerHTML = `
    <tr id="${_id}"> 
        
         
         
            <td><input type="text" id="${_id}-userName_" value="${userName_}" /></td>
            <td><input type="text" id="${_id}-email_" value="${email_}" /></td>
            <button type="button" onclick="updateC('${_id}')" class="btn btn-success">Update</button>
        </tr>`;

    // document.getElementById('userName').value = userName_;
    // document.getElementById('email').value = email_;
    document.getElementById('user_id').value = _id;
}


function updateC(_id) {
    let userName = document.getElementById(`${_id}-userName_`).value;
    let email = document.getElementById(`${_id}-email_`).value;
    axios.put("https://crud-opperation.herokuapp.com/user/" + id, {
        userName: userName,
        email: email,
    })
        .then((response) => {
            alert("user updated");
            console.log(response)
            cba();
        })
        .catch((error) => {
            console.log(error);
            console.log(err);

        });
}
function delet_data(_id) {
    axios.delete('https://crud-opperation.herokuapp.com/user/' + _id)
        .then((response) => {
            console.log(response);
            alert(response.data)
            cba();
        })
        .catch((error) => {
            console.log(error);
        })
        .then(() => {
            console.log();
        })

}
cba();