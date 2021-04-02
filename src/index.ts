import express, {Application, Request, Response} from "express";
import cors from "cors";

const app: Application = express();

const pool = require("./db");


const path = require("path");
const PORT = process.env.PORT || 5000;

//process.env.PORT
//process.env.NODE_ENV => production or undefined

//middleware
app.use(cors());
app.use(express.json()); // => allows us to access the req.body

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

app.post("/", async (req: Request, res: Response) => {
  try {
    const { name, type, weight_int, prot, lip, hc, n_int_card, img_link}  = req.body;
    const newFood = await pool.query(
      "INSERT INTO food (name, type, weight_int, prot, lip, hc, n_int_card, img_link) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [name, type, weight_int, prot, lip, hc, n_int_card, img_link]
    );

    res.json(newFood.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

//get all foods

app.get("/", async (req: Request, res: Response) => {
  try {
    const allFoods = await pool.query("SELECT * FROM food");
    res.json(allFoods.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a food

app.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const food = await pool.query(
        "SELECT * FROM food WHERE food_id = $1", 
        [id]
        );
    res.json (food.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});


//update a food

app.put("/:id", async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, type, weight_int, prot, lip, hc, n_int_card, img_link} = req.body;
        const updateFood = await pool.query(
            "UPDATE food SET name = $1, type = $2, weight_int = $3,prot =$4, lip = $5, hc = $6, n_int_card = $7, img_link = $8 WHERE food_id = $9", 
            [name, type, weight_int, prot, lip, hc, n_int_card, img_link, id]
            );
            res.json("Food was updated!")
    } catch (err) {
        console.log(err.message);
    }
})


//delete a food

app.delete("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteFood = await pool.query("DELETE FROM food WHERE food_id = $1", 
        [id]
        );
        res.json("Food was deleted!")
    } catch (err) {
        console.log(err.message)
    }
})
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen( PORT, () => {
  console.log(`server has started on  ${PORT}`);
});
 