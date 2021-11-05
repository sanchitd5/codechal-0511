class Post{
    /**
     * 
     * @param {Object} data 
     */
    constructor(data){
        this['Title'] = data.title;
        this['Body'] = data.body;
    }
}

export default Post;