/* "themes" holds infos such as id / name etc */
CREATE TABLE themes
(
    id MEDIUMINT NOT NULL,
    name varchar(255),
    pub_date DATE,
    descr varchar(512),
    previmage varchar(255),
    PRIMARY KEY (id)
);

INSERT INTO themes VALUES
(
    1,
    "Patience",
    CURDATE(),
    "...",
    /* We store the img path on the server and not the image itself */
    "/static/themes/1/gal_0.jpg"
),
(
    2,
    "Clarisse",
    CURDATE(),
    "...",
    "/static/themes/2/gal_0.jpg"
);

/* "galleries" holds all the pictures */
CREATE TABLE galleries
(
    theme_id MEDIUMINT NOT NULL,
    /* AUTO_INCREMENT so we don't have to provide an id when INSERT */
    img_id MEDIUMINT NOT NULL AUTO_INCREMENT UNIQUE,
    img varchar(512)

);

INSERT INTO galleries VALUES
(1, 1, "/static/themes/1/gal_0.jpg"),
(1, 2, "/static/themes/1/gal_1.jpg"),

(2, 4, "/static/themes/2/gal_0.jpg"),
(2, 5, "/static/themes/2/gal_1.jpg");

