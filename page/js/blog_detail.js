let blogDetail = new Vue({
    el: "#blog_detail",
    data: {
        title: "",
        content: "",
        ctime: "",
        tags: "",
        views: ""
    },
    computed: {

    },
    created () {
        // 通过url获取参数 , 判断url是否携带?, 如果有，则将其取出来并转换成数组
        let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        // console.log(searchUrlParams);// ["bid=24"]
        // console.log(location.search.split("?")[1]); //bid=24
        if (searchUrlParams == "") {
            return;
        }
        let bid = -10; // 默认设为-10 而关于页和留言板也分别设置不同数以区分
        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryBlogById?bid=" + bid
        }).then(res => {
            let result = res.data.data[0];
            blogDetail.title = result.title;
            blogDetail.content = result.content;
            blogDetail.ctime = result.ctime;
            blogDetail.tags = result.tags;
            blogDetail.views = result.views;
        }).catch(error => {
            console.log("请求错误");
        })
    }
})

let sendComment = new Vue({
    el: "#send_comment",
    data : {
        vCode: "",// 验证码的图标
        rightCode: "" // 正确的验证码值
    },
    computed: {
        changeCode () {
            return () => {
                axios({
                    method: "get",
                    url: "/queryRandomCode"
                }).then(res => {
                    sendComment.vCode = res.data.data.data; 
                    sendComment.rightCode = res.data.data.text; 
                })
            }
        },
        sendComment () {
            return () => {
                let code = document.getElementById("comment_code").value;
                if(code !== sendComment.rightCode) {
                    alert("验证码有误！");
                    this.changeCode();
                    return;
                }
                let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
                let bid = -10;

                for (let i = 0; i < searchUrlParams.length; i++) {
                    if (searchUrlParams[i].split("=")[0] == "bid") {
                        try {
                            bid = parseInt(searchUrlParams[i].split("=")[1]);
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
                let reply = document.getElementById("comment_reply").value;
                let replyName = document.getElementById("comment_reply_name").value;
                let name = document.getElementById("comment_name").value;
                let email = document.getElementById("comment_email").value;
                let content = document.getElementById("comment_content").value;
                axios({ // parent,回复别人就是正值，不回复就是默认的value：-1 代表的是评论性的。 回复别人就是正值
                    method: "get",
                    url: "/addComment?bid=" + bid + "&parent=" + reply + "&userName=" + name + "&email=" + email + "&content=" + content + "&parentName=" + replyName
                }).then(res => {
                    alert(res.data.msg);
                    location.href = "/blog_detail.html?bid=" + bid;
                }).catch(err => {
                    console.log("请求错误");
                })
            }
        }
    },
    created () {
        this.changeCode();
    }
});

let blogComments = new Vue({
    el: "#blog_comments",
    data: {
        total: 0,
        comments: []
    },
    computed: {
        reply () {
            return (commentId, userName) => {
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
                location.href = "#send_comment";
            }
        }
    },
    created () {
        let searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        let bid = -10;

        for (let i = 0; i < searchUrlParams.length; i++) {
            if (searchUrlParams[i].split("=")[0] == "bid") {
                try {
                    bid = parseInt(searchUrlParams[i].split("=")[1]);
                } catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method: "get",
            url: "/queryCommentsByBlogId?bid=" + bid
        }).then(res => {
            blogComments.comments = res.data.data;
            for (let i = 0; i < blogComments.comments.length; i++) {
                if(blogComments.comments[i].parent > -1) {
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name; 
                }
            }
        }).catch(err => {
            console.log("请求错误");
        });
        axios({
            method: "get",
            url: "/queryCommentsCountByBlogId?bid=" + bid
        }).then(res => {
            blogComments.total = res.data.data[0].count;
        }).catch(err => {
            console.log("请求错误");
        });
    }
})
