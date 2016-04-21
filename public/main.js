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
            var $nameOfPoster = $("#nameOfNewPoster").val() || "NewUser";
            var $title = $("#newThreadTitle").val();
            var $post = $("#newThreadPost").val();
            var timeStamp = moment().toObject();
            var $urlToImage = $("postersImage").val() || "http://d1fy1ym40biffm.cloudfront.net/images/default-avatar.png";
            var $newPost = $("<li>").attr("ripple", "");
            var $img = $("<img>").addClass("item-icon").attr("src", $urlToImage);
            var $itemText = $("<span>").addClass("item-text").text($title);
            var $secondaryText = $("<span>").addClass("secondary-text").text(`Posted on ${timeStamp.months + 1}/${timeStamp.date}/${timeStamp.years} by ${$nameOfPoster}`);
           // var $anchor = $("<a>").addClass("bold openThread").attr("/posts").text("New Thread");
           // $($secondaryText).append($anchor);
            console.log($secondaryText.text())
            $($itemText).append($secondaryText);
            $($newPost).append($itemText);
            $($newPost).prepend($img);

            $("#threadList").append($newPost);

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