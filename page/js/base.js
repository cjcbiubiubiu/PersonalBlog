let randomTags = new Vue({
    el: "#random_tags",
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return () => {
                let r = Math.random() * 255;
                let g = Math.random() * 255;
                let b = Math.random() * 255;
                return "rgb(" + r + ", " + g + ", " + b + ")";
            }
        },
        randomSize() {
            return () => {
                let size = (Math.random() * 20 + 12) + "px";
                return size;
            }
        }
    },
    created() {
        axios({
            method: "get",
            url: "/queryRandomTags"
        }).then(res => {
            let result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                result.push({ text: res.data.data[i].tag, link: "/?tag=" + res.data.data[i].tag });
            }
            randomTags.tags = result;
        })
    }
});

let newHot = new Vue({
    el: "#new_hot",
    data: {
        titleList: []
    },
    computed: {

    },
    created() {
        axios({
            method: "get",
            url: "/queryHotBlog"
        }).then(res => {
            let result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                let temp = [];
                temp.title = res.data.data[i].title;
                temp.link = "/blog_detail.html?bid=" + res.data.data[i].id;
                result.push(temp);
            }
            newHot.titleList = result;
        })
    }
});

let newComments = new Vue({
    el: "#new_comments",
    data: {
        commentsList: []
    },
    computed: {

    },
    created() {
        axios({
            method: "get",
            url: "/queryNewComments"
        }).then(res => {
            let result = [];
            for (let i = 0; i < res.data.data.length; i++) {
                let temp = [];
                temp.name = res.data.data[i].user_name;
                temp.date = timestampToTime(res.data.data[i].ctime)
                temp.comment = res.data.data[i].comments;
                // console.log(timestampToTime(res.data.data[i].ctime));
                result.push(temp);
            }
            // result[0].date
            // console.log(result[0].date)
            function timestampToTime(timestamp) {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                Y = date.getFullYear() + '-';
                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                D = date.getDate() < 10 ? '0' + date.getDate() + ':' : date.getDate() + ':';
                h = date.getHours() + ':';
                m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
                return Y + M + D + h + m;
            }

            newComments.commentsList = result;
        })
    },
    method: {
        // timestampToTime (timestamp) {
        //     var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        //     Y = date.getFullYear() + '-';
        //     M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        //     D = date.getDate() + ' ';
        //     h = date.getHours() + ':';
        //     m = date.getMinutes() + ':';
        //     s = date.getSeconds();
        //     return Y+M+D+h+m+s;
        // }
    }
});