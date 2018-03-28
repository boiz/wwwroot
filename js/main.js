$("#btn").click(function(){
    $("#fileToUpload").click();
});

var validateType,validateSelect,validateSize;

function markGreen(selector){
    $(selector).removeClass("red").addClass("green");
    $(selector).find(".icon").removeClass("error").addClass("check");
    $(selector).find(".not").hide();
}

function markRed(selector){
    $(selector).removeClass("green").addClass("red");
    $(selector).find(".icon").removeClass("check").addClass("error");
    $(selector).find(".not").show();
}

$("#fileToUpload").change(function(){
    $(".file").removeClass("d-none");
    fileData = $('#fileToUpload').prop('files')[0];   

    $(".info .name").text(fileData.name);
    $(".info .size span").text((fileData.size/1024).toFixed(2));
    $(".info .type").text(fileData.type);
    //console.log(fileData.size); 

    if(fileData.type=="application/pdf"){
        $(".sprite").css("visibility","visible");
        markGreen(".check .type");
        validateType=true;
    }
    else{
        $(".sprite").css("visibility","hidden");
        markRed(".check .type");
        validateType=false;
    }

    if(fileData.size<5242880){
        markGreen(".check .size");
        validateSize=true;
    }
    else{
        markRed(".check .size");
        validateSize=false;
    }

    validate();
});


$("#sel").change(function(){
    if($(this).val()=="select") {
        markRed(".check .selected");
        validateSelect=false;
    }
    else {
        markGreen(".check .selected");
        validateSelect=true;
    }
    //console.log($(this).val(),validateSelect,validateType);
    validate();
});



function btnStatus(status){

    switch(status){
        case "sending":
            $("#submit").prop("disabled",true);
            $("#submit").text("Sending..");
            break;
        case "resume":
            $("#submit").prop("disabled",false);
            $("#submit").text("Submit");
            break;
        case "invalid":
            $("#submit").prop("disabled",true);
            break;
        case "valid":
            $("#submit").prop("disabled",false);
            break;
    }
}




function validate(){
    if(validateType&&validateSelect&&validateSize) btnStatus("valid");
    else btnStatus("invalid");
    //console.log(validateType,validateSelect,validateSize);
}

$("#submit").click(function(){
    form_data = new FormData();                  
    form_data.append('fileToUpload', fileData);

    $.ajax({
        url: 'upload/upload.php',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,      
        type: 'post',
        beforeSend:function(){
            btnStatus("sending");
        },
        success: function(r){
        	if(r.trim()=="success"){
                $.ajax({
                    url:"upload/rename.php",
                    type:"post",
                    data:{name:$("#sel").val()},
                    success:function(r){
                        btnStatus("resume");


                        $("#view").prop("href","upload/"+$("#sel").val()+".pdf");
                        $("#successModal").modal("show");
                    }
                });

                $('#successModal').on('hidden.bs.modal', function () {
                    location.reload();
                });
            }
            else $("#errorModal").modal("show");
        }
     });
});