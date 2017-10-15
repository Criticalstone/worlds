
$("#countdown")
  .countdown("2017/11/04", function(event) {
    $(this).text(
      event.strftime('%D days %H:%M:%S')
    );
    console.log("found id");
  });

$("#countdown").click(function(){
    console.log("aoehtuaoe");
}
);