const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

// Testi: Blogien tykkäysten yhteismäärä

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
    {
        title:"Blog 1",
        author: "Author 1",
        url:"www.fds.fi",
        likes: 4
    },
    {
        title:"Blog 2",
        author: "Author 2",
        url:"www.fddsadsas.fi",
        likes: 7
    },
    {
        title:"Blog 3",
        author: "Author 3",
        url:"www.fdfdsfvdss.fi",
        likes: 3
    }
  ]

  // Testi: yhden blogin tykkäykset

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  // Testi: usean blogin tykkäykset

  test('when list has multiple blogs, equals the sum of that', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 14)
})

})