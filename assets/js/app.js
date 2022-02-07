
var cl = console.log  // >> first class function.

const createStudent = document.getElementById('createStudent');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const contact = document.getElementById('contact');
const stdInfoHolder = document.getElementById('stdInfoHolder');
const submit = document.getElementById('submit');
const update = document.getElementById('update');

update.style.display = 'none';
let stdArray = [];

 if(localStorage.getItem('setStdInfo')){
    stdArray = getStudentData ();
    templating(stdArray);              
 }

function getStudentData () {
    if(localStorage.getItem('setStdInfo')){
        return JSON.parse(localStorage.getItem('setStdInfo'));
    }
}

function uuid() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function createStdHandler (eve) {
    cl('Hello JS');
    eve.preventDefault() ;                      // prevent bydefault nature
    let stdObj = {
        firstName : fname.value,
        lastName : lname.value,
        Email : email.value,
        Contact : contact.value,
        id : uuid(),
    }
    stdArray.push(stdObj)
    cl(stdArray);
    this.reset();
    localStorage.setItem('setStdInfo', JSON.stringify(stdArray));
    stdArray = getStudentData();
    templating(stdArray);              // call this second function with previous array
}

function onEditBtnHandler (ele) {
    let getId = ele.getAttribute('data-id')
    cl(getId);
    localStorage.setItem('setId', getId);
    update.style.display = 'inline-block';
    submit.style.display = 'none';
    let getLocalData = getStudentData();
    cl(getLocalData);
    let getObj = getLocalData.filter(ele => {
        return ele.id === getId
    })
    cl(getObj);
    fname.value = getObj[0].firstName;
    lname.value = getObj[0].lastName;
    email.value = getObj[0].Email;
    contact.value = getObj[0].Contact;
}

function onUpdateHandler () {
    let getId = localStorage.getItem('setId');
    cl(getId);
    let getLocalData = getStudentData();
    cl(getLocalData);
    getLocalData.forEach(obj => {
        cl(getLocalData)
            if(obj.id === getId){
                obj.firstName = fname.value;
                obj.lastName = lname.value;
                obj.Email = email.value;
                obj.Contact = contact.value;
            }
        })
       
    cl(getLocalData);
    localStorage.setItem('setStdInfo', JSON.stringify(getLocalData));
    createStudent.reset();
    update.style.display = 'none';
    submit.style.display = 'inline-block';
    templating(getLocalData);
}

function onDeleteBtnHandler (ele) {
    cl(ele);
    // let getId = ele.dataset.id;
    let getId = ele.getAttribute('data-id');
    cl(getId);
    let getStdArray = getStudentData();
    cl(getStdArray);
    getStdArray = getStdArray.filter(std => {
        return std.id != getId
    })
    cl(getStdArray);
    localStorage.setItem('setStdInfo', JSON.stringify(getStdArray));
    templating(getStdArray);

} 

function templating (arr) {            // use second function
    let result = ``;
    arr.forEach((std, i) => {
        result += `<tr>
                    <td>${i + 1}</td>
                    <td>${std.firstName}</td>
                    <td>${std.lastName}</td>
                    <td>${std.Email}</td>
                    <td>${std.Contact}</td>
                    <td><button class = 'btn btn-primary' data-id = ${std.id} onclick = "onEditBtnHandler(this)">Edit</button></td>
                    <td><button class = 'btn btn-danger' data-id = ${std.id} onclick = "onDeleteBtnHandler(this)">Delete</button></td>
        </tr>`
    })
    stdInfoHolder.innerHTML = result;
}


createStudent.addEventListener('submit', createStdHandler);
update.addEventListener('click', onUpdateHandler);


// CRUD >> C >> Create
//         R >> Read
//         U >> Update
//         D >> Delete