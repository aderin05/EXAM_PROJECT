import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model("User", userSchema)

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    tags: Array,
    author: String,
    timestamp: Date,
    state: String,
    read_count: Number,
    reading_time: String,
    body: {
        type: String,
        required: true,
    },
})

const Articles = mongoose.model("Articles", articleSchema)

mongoose
  .connect(process.env.MONGODB_URI, {
    //  useNewUrlParser: true,
}).then(() => {
    console.log("Connected to MongoDB")
}).catch((error) => {
    console.log(error)
})

app.get('/articles', async (req, res) => {
    const articles = await Articles.find();
    res.json(articles)
})

app.post('/articles', async (req, res) => {
    const article = new Articles({
         title: "How to write a great blog post",
         description: "This article contains useful information that can help you as a beginner to write a great blog post.",
         tags: ["blog", "exciting", "interesting"],
         author: "Tamin Justice",
         timestamp: new Date(),
         state: "draft",
         read_count: 0,
         reading_time: "null",
         body: "A blog is an informational website consisting of discrete, often informal diary-style text entries. Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page. In the 2000s, blogs were often the work of a single individual, occasionally of a small group, and often covered a single subject or topic. In the 2010s, \"multi-author blogs\" emerged, featuring the writing of multiple authors and sometimes professionally edited. MABs from newspapers, other media outlets, universities, think tanks, advocacy groups, and similar institutions account for an increasing quantity of blog traffic. The rise of Twitter and other \"microblogging\" systems helps integrate MABs and single-author blogs into the news media. Blog can also be used as a verb, meaning to add content or remove from a blog"
    })
    const savedArticle = await article.save();
    res.json(savedArticle)
})

app.get('/', (req, res) => {
    res.send("Welcome to the blog")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} `)
})
