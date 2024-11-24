$(document).ready(function () {
    $(".copy-btn").click(function () {
        // Add the bounce effect
        $(".copied").addClass("bounce-effect");

        // Remove the bounce effect after 3000ms (3 seconds)
        setTimeout(function () {
            $(".copied").removeClass("bounce-effect");
        }, 7000);

        // Copy the text to clipboard
        var text = $("#textField").val();
        navigator.clipboard.writeText(text).then(function () {
            console.log('Copying to clipboard was successful!');
        }, function (err) {
            console.error('Could not copy text: ', err);
        });
    });
});
