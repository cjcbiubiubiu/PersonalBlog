let blogDao = require('../dao/BlogDao');
let tagsDao = require('../dao/TagsDao');
let tagBlogMappingDao = require('../dao/TagBlogMappingDao');
let timeUtil = require('../util/TimeUtil');
let respUtil = require('../util/RespUtil');
let url = require('url');

let path = new Map();

queryRandomTags = (req, res) => {
    tagsDao.queryAllTags(result => {
        result.sort(() => {
            return Math.random() > 0.5 ? true : false;
        });
        res.writeHead(200);
        res.write(respUtil.writeResult("success", "查询成功", result));
        res.end();
    })
}

path.set("/queryRandomTags", queryRandomTags);

// queryByTag = (request, response) => {
//     let params = url.parse(request.url, true).query;
//     tagsDao.queryTag(params.tag, result => {
//         if (result == null || result.length == 0) {
//             response.writeHead(200);
//             response.write(respUtil.writeResult("success", "查询成功", result));
//             response.end();
//         } else {
//             tagBlogMappingDao.queryByTag(result[0].id, parseInt(params.page), parseInt(params.pageSize), resultt => {
//                 let blogList = [];
//                 for (let i = 0; i < result.length; i++) {
//                     blogDao.queryBlogById(result[i].blog_id, resulttt => {
//                         blogList.push(result[0]);
//                     });
//                 }
//                 getResult(blogList, result.length, response);
//             });
//         }
//     });
// }

// path.set("/queryByTag", queryByTag);

// getResult = (blogList, len, response) => {
//     if (blogList.length < len) {
//         setTimeout(() => {
//             getResult(blogList, len, response);
//         }, 10);
//     } else {
//         for (let i = 0; i < blogList.length; i++) {
//             // 过滤标题， 过滤图片 ，限制展示内容数量，
//             blogList[i].content = blogList[i].content.replace(/<img[\w\W]*">/, "");
//             blogList[i].content = blogList[i].content.replace(/<[\w\W]{1,5}>/g, "");
//             blogList[i].content = blogList[i].content.substring(0, 300);
//         }
//         response.writeHead(200);
//         response.write(respUtil.writeResult("success", "查询成功", blogList));
//         response.end();
//     }
// }

// queryByTagCount = (req, res) => {
//     let params = url.parse(req.url, true).query;
//     tagsDao.queryTag(params.tag, result => {
//         tagBlogMappingDao.queryByTagCount(result[0].id, result => { // 视频中是result[0].id
//             res.writeHead(200);
//             res.write(respUtil.writeResult("success", "查询成功", result));
//             res.end();
//         })
//     })
// }

// path.set("/queryByTagCount", queryByTagCount);

module.exports.path = path;