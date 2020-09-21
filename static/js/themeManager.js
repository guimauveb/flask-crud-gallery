/* CRUD interface to manage an image gallery */
var themeManager = {};
(function () {

    /* Security token mandatory to POST / DELETE / PUT etc */
    this.setCSRFToken = function(t) {
        CSRFToken = t;
    }

    /* Open file explorer */
    this.uploadPic = function(id) {
        var input = document.getElementById("img-upl-" + id);
        input.click();
    }

    /* Update HTML - image is not yet retreived from the db but from the browser */
    /* Create a new img container div and move the "add" btn to the bottom */
    this.createHTMLPic = function(theme, id, file, name) {

        /* Remove "add" btn */
        var btn = document.getElementById("theme-modal-img-btn-container-" + theme);
        btn.remove();

        /* Append a new img container to the main container */
        var par = document.getElementById("imgs-container-" + theme);

        var el = document.createElement("div");
        el.className = "theme-modal-img-container";
        el.id = "theme-modal-container-" + id;
        par.append(el);

        var img = document.createElement("img");
        img.className = "theme-modal-img";
        img.src = window.URL.createObjectURL(file)
        el.append(img);

        var cont = document.createElement("div");
        cont.className = "theme-modal-img-container-middle";
        el.append(cont);

        var contLink = document.createElement("div");
        contLink.className = "theme-modal-img-container-link";
        cont.append(contLink);

        var btnw = document.createElement("div");
        btnw.className = "theme-modal-btn-wrapper";
        contLink.append(btnw);

        var delp = document.createElement("a");
        delp.className = "theme-img-btn";
        delp.onclick = function() {themeManager.deletePic(id)};
        btnw.append(delp);

        var icon = document.createElement("i");
        icon.className = "fa fa-times";
        delp.append(icon);

        /* Append "add" btn to imgs container div so it stays at the bottom of the div */
        par.append(btn);
    }


    /* Upload img to the db */
    this.addPic = async function (input, theme) {
        var data = new FormData();
        var img = input.files[0];
        var name = input.files[0].name;
        data.append("pic", img, name);
        data.append("theme", theme);
        try {
            const response = await fetch("/addPic", {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                /* Let the browser set the headers */
                headers: {
                    'X-CSRFToken': CSRFToken
                },
                body: data
            })
            /* Get a json containing theme id, img id, and img link */
            await response.json().then(id => {
                this.createHTMLPic(theme, id, img, name);
            })
        } catch(err) {
            console.log(err);
        }
    };

    /* Remove img from the DOM */
    this.deleteHTMLPic = function(id) {
        var el = document.getElementById("theme-modal-container-" + id);
        el.remove();
    }

    /* Delete img from the db */
    this.deletePic = async function(id) {
        try {
            const response = await fetch("/deletePic", {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': CSRFToken
                },
                body: JSON.stringify({"img": id})
            })
            /* Delete img from the dom once it has been removed from the db */
            await response.json().then(id => {
                this.deleteHTMLPic(id);
            })
        } catch(err) {
            console.log(err);
        }
    };

}).apply(themeManager);

