$(document).ready(function () {

    $("#btn").click(function () {
        //alert(document.getElementById("startdate").value);
        let startDate = document.getElementById("startdate").value;
        let enddate = document.getElementById("enddate").value;

        let dateFrom = Date.parse(startDate);
        let dateTO = Date.parse(enddate);
        //alert(dateFrom);
        //alert(dateTO);

        if ( dateTO <= dateFrom ) {
            //alert("here");
            $('#tableDiv').hide();
            $('#btn').prop('disabled', true);
            $('#wrongDatediv').show();
            return false;
        }


        $.ajax({
            type: "GET",
            url: 'https://data.gov.gr/api/v1/query/mdg_emvolio?date_from=' + startDate + '&date_to=' + enddate + '',
            headers: {
                "Authorization": "Token af10bae09621a1cda7683d0e70cd61b1a870dc42"
            },
            success: function (data) {

                //alert('Total results found: ' + data.length);
                //console.log(data);
                //console.log(data[1]["referencedate"]);

                var i;
                let dates = [];
                for (i = 0; i < data.length; i++) {

                    let date = data[i]['referencedate'];

                    if (dates.includes(date)) {
                        continue;
                    } else {
                        dates.push(date);
                    }

                }
                //console.log(dates);

                var x;
                var y;
                let k;
                let date = '';
                let daytotal;
                let dailydose1;
                let dailydose2;
                let totalvaccinations;
                for (x = 0; x < dates.length; x++) {

                    daytotal = 0;
                    dailydose1 = 0;
                    dailydose2 = 0;
                    totalvaccinations = 0;

                    for (y = 0; y < data.length; y++) {

                        if (data[y]['referencedate'] == dates[x]) {
                            daytotal = daytotal + data[y]['daytotal'];
                            dailydose1 = dailydose1 + data[y]['dailydose1'];
                            dailydose2 = dailydose2 + data[y]['dailydose2'];
                            totalvaccinations = totalvaccinations + data[y]['totalvaccinations'];
                        }

                    }

                    for (k = 0; k < 10; k++) {
                        date = date + dates[x][k];
                    }

                    $("#tableBody").append(" <tr>  <th scope='row'>" + date + "</th> <td>" + daytotal + "</td> <td>" + dailydose1 + "</td> <td>" + dailydose2 + "</td> <td>" + totalvaccinations + "</td>  </tr>");

                    date = '';

                }

                $('#btn').prop('disabled', true);

            },
            error: function () {
                $('#tableDiv').hide();
                $('#btn').prop('disabled', true);
                $('#ERRORdiv').show();
            }
        });


    });


});
