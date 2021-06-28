$(document).ready(function () {

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    $("#hideFormDiv").click(function () {
        //alert("The paragraph was clicked.");

        var name = document.getElementById("name").value;
        var surname = document.getElementById("surname").value;
        var phoneNum = document.getElementById("phoneNum").value;
        var email = document.getElementById("email").value;
        var amka = document.getElementById("amka").value;
        var gender = document.getElementById("gender").value;

        if (/\d/.test(name) || /\d/.test(surname) || name == "" || surname == "") {
            alert("Παρακαλώ εισάγετε σωστά το Όνομα και το Επώνυμο σας");
            return false;
        }

        if (isNaN(phoneNum) || phoneNum.length != 10 || phoneNum == "") {
            alert("Παρακαλώ εισάγετε έναν έγκυρο αριθμό τηλεφώνου");
            return false;
        }

        if (validateEmail(email) === false || email == "") {
            alert("Παρακαλώ εισάγετε ένα έγκυρο email");
            return false;
        }

        if (isNaN(amka) || amka.length != 11 || amka == "") {
            alert("Παρακαλώ εισάγετε σωστά τον ΑΜΚΑ σας");
            return false;
        }

        if (name != "" && surname != "" && phoneNum != "" && email != "" && amka != "" && gender != "" && email.includes("@")) {
            //alert("OK");
            $('#hideThisHeader').hide();
            $('#formDiv').hide();

            $('#arrangeDateTimeDiv').show();

            var date = randomDate(new Date(), new Date(2021, 8), 9, 21);
            document.getElementById("arragement").innerHTML = date.toLocaleString('el-GR', { timeZone: "UTC" });
        } else {
            alert("Παρακαλώ επιλέξτε φύλο");
        }

    });

    $("#chooseDateTime").click(function () {

        $('#arrangeDateTimeDiv').hide();
        $('#manualDateTimeDiv').show();

    });

    function randomDate(start, end, startHour, endHour) {
        var date = new Date(+start + Math.random() * (end - start));
        var hour = startHour + Math.random() * (endHour - startHour) | 0;
        date.setHours(hour);
        return date;
    }

    const picker = document.getElementById('start');
    picker.addEventListener('input', function (e) {
        var day = new Date(this.value).getUTCDay();
        if ([6, 0].includes(day)) {
            e.preventDefault();
            this.value = '';
            alert('Τα εμβολιαστικά κέντρα λειτουργούν Δευτέρα-Παρασκευή.Παρακαλώ επιλέξτε άλλη μέρα');
        }
    });

    $("#button2").click(function () {

        var time = document.getElementById('appt').value;
        var date = document.getElementById('start').value;

        var parts = time.split(':');

        if (parts[0].includes("0")) {
            parts[0].replace("0", "");
        }

        if (parts[0] < 22 && parts[0] >= 9 && date != "") {
            $("#submitForm").click();
        } else {
            alert("Το ωράριο είναι 9πμ-10μμ από Δευτέρα έως Παρασκευή.Παρακαλώ επιλέξτε ώρα και μέρα για τον εμβολιασμό σας")
        }

    });


    // ajax post
    $("#submitForm").click(function () {
        //alert("clicked");
        $('#form').hide();

        // post to api
        let name = $("#name").val();
        let surname = $("#surname").val();
        let phoneNum = $("#phoneNum").val();
        let email = $("#email").val();
        let amka = $("#amka").val();
        let gender = $("#gender").val();

        $('#ajaxWait').show();

        $.post(
            "https://us-central1-unipi-aps.cloudfunctions.net/emvolioDate",
            {
                name: name,
                surname: surname,
                phoneNum: phoneNum,
                email: email,
                amka: amka,
                gender: gender
            },
            function (response) {
                //console.log(response);
                $('#ajaxWait').hide();
                
                if (response.status === "SUCCESS") {
                    $('#ajaxSuccess').show();
                }
            }
        ).fail(function () {
            $('#ajaxWait').hide();
            $('#ajaxError').show();
        });

    });



});