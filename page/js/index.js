let everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "桃花坞里桃花庵，桃花庵里桃花仙。"
    },
    computed: {
        getContent () {
            return this.content;
        }
    },
    created () {
        axios({
            method: "get",
            url: "/queryEveryDay"
        }).then(res => {
            everyDay.content = res.data.data[0].content;

        }).catch(err => {
            console.log("请求失败,错误原因：" + err);
        });
    }
});

let articleList = new Vue({
    el: "#article_list",
    data: {
        page: 1,
        pageSize: 5,
        pageNumList: [],
        count: 100,
        articleList: []
    },
    computed: {
        jumpTo () {
            return page => {
                this.getPage(page, this.pageSize);
            }
        },
        getPage () {
            return (page, pageSize) => {
                    axios({
                        method: "get", 
                        // page从1开始查， 而数据库从0开始查， 所以让page-1 也从0开始查，方便操作
                        url: "/queryBlogByPage?page=" + (page - 1) + "&pageSize=" + pageSize
                    }).then(res => {
                        let result = res.data.data;
                        let list = [];
                        for (let i = 0; i < result.length; i++) {
                            let temp = {};
                            temp.title = result[i].title;
                            temp.content = result[i].content;
                            temp.date = result[i].ctime;
                            temp.views = result[i].views;
                            temp.tags = result[i].tags;
                            temp.id = result[i].id;
                            temp.link = "/blog_detail.html?bid=" + result[i].id;
                            list.push(temp);
                        }
                        articleList.articleList = list; 
                        articleList.page = page;
                    }).catch(err => {
                        console.log("请求错误");
                    });
                    axios({
                        method: "get",
                        url: "/queryBlogCount", 
                    }).then(res => {
                        articleList.count = res.data.data[0].count;
                        articleList.generatePageTool;
                    }).catch(err => {
                        console.log("请求错误");
                    }); 
            }
        },
        generatePageTool () {
            let nowPage = this.page;
            let pageSize = this.pageSize;
            let totalCount = this.count;
            let result = [];
            result.push({text: "<<", page: 1});
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1});
            }
            result.push({text: nowPage, page: nowPage});
            if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2});
            }
            result.push({text: ">>", page: parseInt((totalCount + pageSize - 1) / pageSize)});
            this.pageNumList = result;
            return result;
        }
    },
    created () {
        this.getPage(this.page, this.pageSize);
    }
})


