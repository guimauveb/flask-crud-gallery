/* Hide / show theme modals */
var themeModal = {};
(function() {

    var modal;

    this.display = function(m) {
        modal = document.getElementById("modal-theme-" + m);
        modal.style.display = "block";
       // slideshow.launch(m);
    }


    this.close = function(m) {
        modal = document.getElementById("modal-theme-" + m);
        modal.style.display = "none";
    }


    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}).apply(themeModal);


/* Display themes images as a slideshow */
var slideshow = {};
(function() {

    /* Only keep img divs from which we'll create the slideshow */
    this.getImgDivs = function(nodes) {
        var x = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].className == "modal-theme-image") {
                x.push(nodes[i]);   
            }
        }
        return x;
    }

    this.launch = function(id) {

        var slideIndex = 1;

        this.plusDivs = function(n) {
            this.showDivs(slideIndex += n);
        }

        this.showDivs = function(n) {
            var i;
            var cont = document.getElementById("mic-theme-" + id);
            var x = this.getImgDivs(cont.childNodes);
            if (n > x.length) {slideIndex = 1}
            if (n < 1) {slideIndex = x.length}
            for (i = 0; i < x.length; i++) {
                x[i].style.display = "none";
            }
            x[slideIndex-1].style.display = "block";
        }

        this.showDivs(slideIndex);

    };
}).apply(slideshow);

