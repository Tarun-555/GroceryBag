const app = require("express")();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const authRoutes = require("./server/routes/auth");
// const userRoutes = require("./routes/users");
const { authorize } = require("./server/middleware/auth");

require("dotenv").config();

const {NODE_PORT, NODE_ENV,DATABASE_URL} = process.env;

const PORT = process.env.PORT || NODE_PORT || 8000

const isDevelopment = NODE_ENV === "development";


if(NODE_ENV === "development")
{
  app.use(morgan("dev"));
}else{
    app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true,
})
);


if(isDevelopment)
{
    app.use(cors());
}

app.use("/api",authRoutes);

app.use("/api/users", authorize, authRoutes);

mongoose.connect(DATABASE_URL,{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useNewUrlParser: true,
})
.then(()=>{
    app.listen(PORT,
        ()=>{console.log(`DB connected and server is running on ${PORT}-${NODE_ENV}`);
});
})
.catch((err)=>{
    console.error("DB connection failed",err);
});


