const express = require('express');
const app = express();
const globalConfig = require('./config');// 或者使用这个 const port = process.env.PORT || 5001;
const loader = require('./loader')

app.use(express.static("./page/")); // 开放静态资源

app.post("/editEveryDay", loader.get("/editEveryDay"));
app.get("/queryEveryDay", loader.get("/queryEveryDay"));

app.post("/editBlog", loader.get("/editBlog"));
app.get("/queryBlogByPage", loader.get("/queryBlogByPage"));

app.get("/queryBlogCount", loader.get("/queryBlogCount"));
app.get("/queryBlogById", loader.get("/queryBlogById"));

app.get("/addComment", loader.get("/addComment"));

app.get("/queryRandomCode", loader.get("/queryRandomCode"));

app.get("/queryCommentsByBlogId", loader.get("/queryCommentsByBlogId"));

app.get("/queryCommentsCountByBlogId", loader.get("/queryCommentsCountByBlogId"));

app.get("/queryAllBlog", loader.get("/queryAllBlog"));

app.get("/queryRandomTags", loader.get("/queryRandomTags"));

app.get("/queryHotBlog", loader.get("/queryHotBlog"));

app.get("/queryNewComments", loader.get("/queryNewComments"));

// app.get("/queryByTag", loader.get("/queryByTag"));
// app.get("/queryByTagCount", loader.get("/queryByTagCount"));

app.listen(globalConfig.port, () => {
    console.log("服务器已启动！");
    // console.log(globalConfig); // { port: '3000', web_path: 'web' }
})
