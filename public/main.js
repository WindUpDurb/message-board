/**
 * Created by david on 4/20/16.
 */

var operations = {

    openNewThreadModal : function () {
        $("#newThreadButton").click(function () {
            $("#addThreadModal").modal("show");
        });
    },

    saveNewThread : function () {
        $("#createNewThread").click(function () {
            var $username = $("#nameOfNewPoster").val() || "NewUser";
            var $threadTitle = $("#newThreadTitle").val() || "Did you forget?";
            var $post = $("#newThreadPost").val() || "Hey, where's your post?";
            var newTime = moment().toObject();
            var timeStamp = `${newTime.months + 1}/${newTime.date}/${newTime.years}`;
            var $avatarURL = $("postersImage").val() || "http://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png";
            //data to send
            var newThreadData = {
                username : $username,
                timeStamp : timeStamp,
                threadTitle : $threadTitle,
                avatarURL : $avatarURL
            };

           $.ajax({
               type: "POST",
                url: "/messageboard",
                data: newThreadData
            });
            
            $("#addThreadModal").modal("hide")

        })

    }

}


let initialize = function () {
    console.log("Working");
    operations.openNewThreadModal();
    operations.saveNewThread();
    //for material -- Keep
    var md = new Material();

};


$(document).ready(initialize);