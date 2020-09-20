/* Hide / show project modals */
var themeModal = {};
(function() {

    var modal;

    this.display = function(mId) {
        modal = document.getElementById(mId);
        modal.style.display = "block";
//        slideshow.setModal(mId);
 //       slideshow.launch();
    }

    this.close = function(mId) {
        modal = document.getElementById(mId);
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}).apply(themeModal);


/* Display projects images as a slideshow */
var slideshow = {};
(function() {

    var id;
    var slideIndex = 1;

    this.setModal = function(id) {
    }
    /* Only keep img divs from which we'll create the slideshow */
    this.getImgDivs = function(nodes) {
        var x = [];
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].className == "modal-project-image") {
                x.push(nodes[i]);   
            }
        }
        return x;
    }

    this.launch = function() {

        modalId = id;
        this.plusDivs = function(n) {
            this.showDivs(slideIndex += n);
        }

        this.showDivs = function(n) {
            var i;
            var cont = document.getElementById("mic-" + modalId);
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


