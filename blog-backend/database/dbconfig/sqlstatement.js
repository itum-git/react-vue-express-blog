
/** user表 */
const user = {
    insert: 'INSERT INTO user(userid, username, password) VALUES(?,?,?)',
    update: 'UPDATE user SET username=?, password=? WHERE userid=?',
    delete: 'DELETE FROM user WHERE userid=?',
    queryById: 'SELECT * FROM user WHERE userid=?',
    queryByName: 'SELECT * FROM user WHERE username=?',
    queryAll: 'SELECT * FROM user'
}

/** blog表 */
const blog = {
    insertNewBlog: 'INSERT INTO blog(user_id, blog_id, blog_name, blog_type, blog_content, update_time, create_time) VALUES(?,?,?,?,?,?,?)',
    updateBlogById: 'UPDATE blog SET blog_name=?, blog_type=?, blog_content=? WHERE blog_id=?',
    deleteBlogById: 'DELETE FROM blog WHERE blog_id=?',
    queryBlogById: 'SELECT * FROM blog WHERE blog_id=?',
    queryBlogByUserId: 'SELECT * FROM user WHERE user_id=?',
    queryAllBlog: 'SELECT * FROM blog'
}

/** admin表 */
const manager = {
    insert: 'INSERT INTO manager(user_id, user_name, user_pass, create_time) VALUES(?,?,?,?)',
    update: 'UPDATE manager SET user_name=?, user_pass=? WHERE user_id=?',
    delete: 'DELETE FROM manager WHERE user_id=?',
    queryById: 'SELECT user_id, user_name, create_time FROM manager WHERE user_id=?',
    queryByName: 'SELECT * FROM manager WHERE user_name=?',
    queryAll: 'SELECT user_id, user_name, create_time FROM manager'
}

module.exports = {
    manager,
    blog,
    user
}
