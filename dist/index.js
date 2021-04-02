"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const pool = require("./db");
const path = require("path");
const PORT = process.env.PORT || 5000;
//process.env.PORT
//process.env.NODE_ENV => production or undefined
//middleware
app.use(cors_1.default());
app.use(express_1.default.json()); // => allows us to access the req.body
// app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.static("./client/build")); => for demonstration
/* if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));
 */
//ROUTES//
//create a food
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, type, weight_int, prot, lip, hc, n_int_card, img_link } = req.body;
        const newFood = yield pool.query("INSERT INTO food (name, type, weight_int, prot, lip, hc, n_int_card, img_link) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", [name, type, weight_int, prot, lip, hc, n_int_card, img_link]);
        res.json(newFood.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
}));
//get all foods
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allFoods = yield pool.query("SELECT * FROM food");
        res.json(allFoods.rows);
    }
    catch (err) {
        console.error(err.message);
    }
}));
//get a food
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const food = yield pool.query("SELECT * FROM food WHERE food_id = $1", [id]);
        res.json(food.rows[0]);
    }
    catch (err) {
        console.log(err.message);
    }
}));
//update a food
app.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, type, weight_int, prot, lip, hc, n_int_card, img_link } = req.body;
        const updateFood = yield pool.query("UPDATE food SET name = $1, type = $2, weight_int = $3,prot =$4, lip = $5, hc = $6, n_int_card = $7, img_link = $8 WHERE food_id = $9", [name, type, weight_int, prot, lip, hc, n_int_card, img_link, id]);
        res.json("Food was updated!");
    }
    catch (err) {
        console.log(err.message);
    }
}));
//delete a food
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteFood = yield pool.query("DELETE FROM food WHERE food_id = $1", [id]);
        res.json("Food was deleted!");
    }
    catch (err) {
        console.log(err.message);
    }
}));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
});
app.listen(PORT, () => {
    console.log(`server has started on  ${PORT}`);
});
//# sourceMappingURL=index.js.map