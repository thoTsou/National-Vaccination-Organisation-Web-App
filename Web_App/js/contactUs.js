$(document).ready(function () {

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    $("#sendFormBtn").click(function () {
        $('#hiddenSpan').hide();
        $('#hiddenSpan2').hide();

        let phoneNum = document.getElementById("phone").value;
        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;


        if( /\d/.test(name) ){
            $('#hiddenSpan').show();
            return false;
        }

        if( isNaN(phoneNum) || phoneNum.length != 10 ){
            alert("Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου");
            return false;
        }


        if( validateEmail(email) === false ){
            $('#hiddenSpan2').show();
            return false;
        }

    });
    
  
  });
  