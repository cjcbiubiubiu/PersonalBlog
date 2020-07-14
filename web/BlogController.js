let blogDao = require('../dao/BlogDao');
let tagsDao = require('../dao/TagsDao'); 
let tagBlogMappingDao = require('../dao/TagBlogMappingDao');
let timeUtil = require('../util/TimeUtil');
let respUtil = require('../util/RespUtil');
let url = require('url');

let path = new Map();

queryHotBlog = (req, res) => {
    blogDao.queryHotBlog(5, result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryHotBlog", queryHotBlog);

/**
 * 用于sitemap
 */
queryAllBlog = (req, res) => {
    blogDao.queryAllBlog(result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryAllBlog", queryAllBlog);

queryBlogById = (req, res) => {
    let params = url.parse(req.url, true).query;
    blogDao.queryBlogById(parseInt(params.bid), result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
        blogDao.addViews(parseInt(params.bid), result => {});
    });
} 

path.set("/queryBlogById", queryBlogById);

/**
 * 拿到文章的总数，分页的count要用
 */
queryBlogCount = (req, res) => {
    blogDao.queryBlogCount(result => {
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryBlogCount", queryBlogCount);

queryBlogByPage = (req, res) => {
    let params = url.parse(req.url, true).query;
    blogDao.queryBlogByPage(parseInt(params.page), parseInt(params.pageSize), result => {
        for (let i = 0; i < result.length; i++) {
            // 过滤标题， 过滤图片 ，限制展示内容数量，
            result[i].content = result[i].content.replace(/<img[\w\W]*">/, "");
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g, "");
            result[i].content = result[i].content.substring(0, 300);
        }
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    });
}

path.set("/queryBlogByPage", queryBlogByPage);

editBlog = (req, res) => {
    let params = url.parse(req.url, true).query;
    let tags = params.tags.replace(/ /g, "").replace("，", ",");

    req.on("data", data => { // views初始值为0
        blogDao.insertBlog(params.title, data.toString(), tags, 0, timeUtil.getNow(), timeUtil.getNow(), result => {
            res.writeHead(200);
            res.write(respUtil.writeResult("success", "添加成功", null));
            res.end();
            let blogId = result.insertId;
            let tagList = tags.split(",");//用英文逗号隔开，返回一个数组
            for (let i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i], blogId); // 根据ID查询标签
            }
        });
    });
}

path.set("/editBlog", editBlog);

queryTag = (tag, blogId) => {
    tagsDao.queryTag(tag, result => {
        if (result == null || result.length == 0) { // 如果不存在当前tag，则插入tag
            insertTag(tag, blogId);
        } else { // 有标签的时候插入一个标签和博客的映射
            tagBlogMappingDao.insertTagBlogMapping(result[0].id, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {});
        }
    });
}
/**
 * 插入tag表是为了做标签云。还有用标签去查找
 * 还需要一个映射表
 * ....没有标签的时候，插入一个标签，再插入一个映射
 */
insertTag = (tag, blogId) => {
    tagsDao.insertTag(tag, timeUtil.getNow(), timeUtil.getNow(), result => {
        // 插入blog和tag的映射
        insertTagBlogMapping(result.insertId, blogId);
    });
}

insertTagBlogMapping = (tagId, blogId) => {
    tagBlogMappingDao.insertTagBlogMapping(tagId, blogId, timeUtil.getNow(), timeUtil.getNow(), result => {});
}

module.exports.path = path;
