const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, item) => sum + item.likes,0)
}

const favoriteBlog = (blogs) => {
    const blog = blogs.find(el => el.likes === blogs.map(el => el.likes).reduce( (a,b) => Math.max(a,b) ))
    return {title:blog.title,author:blog.author,likes:blog.likes}
}

const mostBlogs = (blogs) => {
    const authors = {
    }
    blogs.map(el => authors[el.author] ? authors[el.author] += 1 : authors[el.author] = 1)
    const author = Object.keys(authors).reduce( (a,b) => authors[a] >= authors[b] ? a:b)
    return {author, blogs:authors[author]}
}

const mostLikes = (blogs) => {
    const authors = {
    }
    blogs.map(el => authors[el.author] ? authors[el.author] += el.likes : authors[el.author] = el.likes)
    const author = Object.keys(authors).reduce( (a,b) => authors[a] >= authors[b] ? a:b)
    return {author, likes:authors[author]}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}