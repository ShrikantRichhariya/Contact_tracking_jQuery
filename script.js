$(document).ready(function () {
    $("#success-alert").hide();
    $("#contact").click(function showAlert() {
        $("#success-alert").fadeTo(2000, 500).slideUp(500, function () {
            $("#success-alert").slideUp(500);
        });
    });
});

$("#home").click(function () {
    $('#id01').hide();
    $('#contact-form').hide();
    $('#home-block').toggle();
});


$("a[href$='#login']").click(function () {
    $("#id01").fadeIn('slow');
    $('form').fadeIn('slow');
    $('#contact-form').hide();
    $('#home-block').hide();

});

$('#cancel').click(function () {
    $('#id01,form').hide();

});


// getting UI by DOM 

const username = document.getElementById('two');
const password = document.getElementById('three');
const loginBtn = document.getElementById('login-btn');
const loginFormErrorMessage = document.getElementById('login-error');
const sucessfulLoginFormMessage = document.getElementById('sucessful-login-msg');
const user = document.getElementById('user');
const homeState = document.getElementById('home-block');

loginBtn.addEventListener("click", authLogin);

//  authenticate functions
function authLogin(e) {
    //value to be checked in login.json file
    let emailInputValue = username.value;
    let passwordInputValue = password.value;
    e.preventDefault();


    const xhr = new XMLHttpRequest();
    //open login.json file in AJAX
    xhr.open("GET", "login.json", true);
    //onload function
    xhr.onload = function () {
        if (this.status === 200) {

            const users = JSON.parse(this.responseText);
            //getting value of each user by forEach loop


            users.forEach(user => {

                //object destructuring
                const { email, password } = user;

                if (email === emailInputValue) {
                    if (password === passwordInputValue) {

                        let userName = user.firstName;

                        sucessfulLoginFormMessage.innerHTML = `
                        Logged In As ${userName}
                    `;
                        loginFormErrorMessage.style.display = 'none';


                        $(document).ready(function () {
                            //logout button show
                            $('#logout').show();

                            //logout button function
                            $('#logout').on("click", function () {
                                location.reload(true);
                            });

                            //INITIAL STATE
                            $('#id01').hide();
                            $('#contact-form').hide();
                            $('#home-block').show();
                            $('#user').show();
                            $('#user').text(`Welcome ${userName} !!!`);

                            $('#added-information').show();




                            //IF LOGIN -- ADD CONTACT FORM
                            $('#contact').click(function () {
                                $('#id01').hide();
                                $('#contact-form').show();
                                $('#home-block').hide();
                                $("#success-alert").hide();



                                //AFTER CLICK ON ADD CONTACT ADD VALUE TO TABLE after checking IF FIELD ARE NOT EMPTY
                                $('#add-contact-btn').click(function () {

                                    //assign form values to variables
                                    let fname = $('#firstName').val();
                                    let lname = $('#lastName').val();
                                    let mnumber = $('#mobile').val();
                                    let emailID = $('#email').val();
                                    let city = $('#city').val();


                                    if (fname === "" || lname === "" || mnumber === "" || emailID === "" || city === "") {
                                        // alert('Please Fill in All fields !!!')

                                        $('#added-msg').hide();

                                        contactMessage("Please fill in all Fields !!!");

                                        $('#all-message').empty();

                                    } else {

                                        $('#home-group-container').show();

                                        $('#all-message').hide();


                                        addedContactMessage("Contact added successfully !!!")

                                        $('#added-msg').empty();

                                        let i = $('#table-contents').find('tr').length;
                                        ;

                                        //creating HTML node to append in table body
                                        if (user.role === 'admin') {
                                            let html = `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${fname}</td>
                                    <td>${lname}</td>
                                    <td>${mnumber}</td>
                                    <td>${emailID}</td>
                                    <td>${city}</td>
                                    <td>
                                    <button class='btnedit btn-info btn-edit'>Edit</button><button class='btndelete btn-danger btn-delete'>Delete</button></td></tr>");
                                    </td>
                                </tr>
                                `;

                                            $('#table-contents').append(html);
                                        } else {
                                            let html = `
                                <tr>
                                    <td>${i + 1}</td>
                                    <td>${fname}</td>
                                    <td>${lname}</td>
                                    <td>${mnumber}</td>
                                    <td>${emailID}</td>
                                    <td>${city}</td>
                                    <td>
                                        You are not admin !!!
                                    </td>
                                </tr>
                                `;

                                            $('#table-contents').append(html);
                                        }


                                        $('#firstName').val(" ");
                                        $('#lastName').val(" ");
                                        $('#mobile').val(" ");
                                        $('#email').val(" ");
                                        $('#city').val(" ");
                                    }
                                });
                            });



                        });
                    }
                }
                else {
                    loginFormErrorMessage.innerHTML = "Enter VALID USER ID AND PASSWORD !!!";

                    setTimeout(hideMessage, 3000);
                }
            });
        }
    }

    xhr.send();
}
function hideMessage() {
    loginFormErrorMessage.style.display = 'none';

}
function contactMessage(message) {
    $(document).ready(function () {
        $('#all-message').append(message);
        $('#all-message').show();
        $('#all-message').hide(3000);
    });
}
function addedContactMessage(message) {
    $(document).ready(function () {
        $('#all-message').append(message);
        $('#all-message').show();
        $('#all-message').hide(3000);
    });
}
$(document).ready(function () {
    $("#find").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table-contents tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//   Delete button function

$("#added-information").on("click", ".btn-delete", function () {

    $(this).parents("tr").remove();

});

