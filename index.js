const express = require("express")
const ejs = require("ejs")
const app = express()

app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true }))

let todoArray = [];
let message;
let isEditing = false;
let editingTodo;


app.get("/", (req, res) => {
    res.render("index", { todoArray, message, isEditing, editingTodo })
})


app.post("/todo", (req, res) => {

    console.log("todo", req.body);

    const { title, text } = req.body

    if (!title.trim() || !text.trim()) {
        console.log("All fields are mandatory !!");
        message = "All fields are mandatory !!"
        res.redirect("/")
    } else {
        todoArray.push(req.body)
        message = ""
        res.redirect("/")
    }
})

app.post("/todo/delete/:index", (req, res) => {
    const { index } = req.params
    todoArray.splice(index, 1)

    isEditing = false;
    res.redirect("/")

})

app.post("/todo/edit/:index", (req, res) => {
    const { index } = req.params
    editingTodo = { ...todoArray[index], index }
    isEditing = true;

    console.log(editingTodo);

    res.redirect("/")
})

app.post("/todo/edit/cancel", (req, res) => {
    isEditing = false;
    editingTodo = null;
    res.redirect("/")
})

app.post("/todo/update/:index", (req, res) => {
    console.log("Updatetodo", req.body);

    console.log("updated index", req.params);

    const { index } = req.params
    const { title, text } = req.body

    if (!title.trim() || !text.trim()) {
        message = "All fields are mandatory !!"
        res.redirect("/")
    } else {
        todoArray[index] = { title, text }
        message = ""
        res.redirect("/")
    }

    isEditing = false;
    editingTodo = null;
    res.redirect("/")
})



const PORT = 7001
app.listen(PORT, () => {
    console.log(`App started on port ${PORT}`);

})