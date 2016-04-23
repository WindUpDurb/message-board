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

        });

    },

    deleteThreadModal : function () {
        $(".deleteThread").click(function () {
            var $postID = $(this).attr("data-postID");
            $("#deleteThreadModal").modal("show");
            var toDelete = {
                toDelete : $postID
            };
            //post request
            $.ajax({
                type: "POST",
                url: "/messageboard",
                data: toDelete
            });
        });
    },

    confirmThreadDelete : function () {
        $("#deleteThread").click(function () {
            $.ajax({
                type: "DELETE",
                url: "/messageboard"
                //on successful response do jquery to update dom
            });
            $("#deleteThreadModal").modal("hide");
        });
    },

    openEditPostModal : function () {
        $(".editThread").click(function () {
            $("#editPostModal").modal("show");
        });
    }

};


let initialize = function () {
    console.log("Working");
    operations.openNewThreadModal();
    operations.saveNewThread();
    operations.deleteThreadModal();
    operations.confirmThreadDelete();
    operations.openEditPostModal();
    //for material -- Keep
    var md = new Material();

};


$(document).ready(initialize);