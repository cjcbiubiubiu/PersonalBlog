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
        let bid = -1;
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
});

let sendComment = new Vue({
    el: "#send_comment",
    data : {
        vCode: "",
        rightCode: ""
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
                
                let bid = -1;
                let reply = document.getElementById("comment_reply").value;
                let replyName = document.getElementById("comment_reply_name").value;
                let name = document.getElementById("comment_name").value;
                let email = document.getElementById("comment_email").value;
                let content = document.getElementById("comment_content").value;
                axios({
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
