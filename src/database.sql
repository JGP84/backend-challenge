-- CREATE DATABASE freenutrition;

--\c food

CREATE TABLE food (
    food_id SERIAL PRIMARY KEY,
    name VARCHAR(25),
    type VARCHAR(20),
    weight_int int,
    prot real,
    lip real,
    hc real,
    n_int_card int,
    img_link VARCHAR(200)
);
