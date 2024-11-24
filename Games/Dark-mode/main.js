$(document).ready(function () {
    // Dark mode and the button
    $('#toggle-btn').click(function () {
        // Change background color
        $("body").toggleClass("dark-mode");
        $(this).css("border", "1px solid #f5f5f5");

        // toggle button text
        $("span").text($("span").text() == "Light Mode" ? "Dark Mode" : "Light Mode");

        // toggle Icon
        $(this).find("i").toggleClass("fa-moon fa-sun");

        // Apply or remove the overlay for dark mode
        if ($("body").hasClass("dark-mode")) {
            $('.paragraph').addClass('invisible-text').append('<div class="hover-reveal"></div>');
        } else {
            $('.paragraph').removeClass('invisible-text').find('.hover-reveal').remove();
        }
    });


    // Dynamic reveal effect on hover
    $(document).on('mousemove', function (e) {
        if ($("body").hasClass("dark-mode")) {
            // Assuming .paragraph has the overlay appended
            var $reveal = $('.paragraph .hover-reveal');
            if ($reveal.length) {
                var offset = $('.paragraph').offset();
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;

                // Ensure the gradient is centered on the mouse within the paragraph
                $reveal.css('background', `radial-gradient(circle 150px at ${x}px ${y}px, rgba(255,255,255,0) 0%, rgba(29,29,29,0.5) 19%, rgba(0,0,0,1) 38%)`);
            }
        }
    });

});