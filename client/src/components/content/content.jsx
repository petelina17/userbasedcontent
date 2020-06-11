import React from 'react'
import './content.css'
import ForumIcon from '@material-ui/icons/Forum'
import {Button} from '@material-ui/core'
import logo from './logo.png'
import StateContext from '../../contexts/StateContext'
import HomePage from '../homePage/homepage'

let id = 0

class Content extends React.Component {
  static contextType = StateContext

  state = {
    addPost: false,
    edit: false,
    text: '',
    title: '',
    blogPosts: [],
    username: 'unknown',
  }

  componentDidMount() {
    if (this.context.username == null) {
      const currentUser = localStorage.getItem('ubc.username')
      if (currentUser != null) {
        this.context.username = currentUser
      }
    }
    console.log('username:', this.context.username)
    this.setState({username: this.context.username})
    this.getContent()
  }

  forgetUser = () => {
    this.context.username = null
    this.setState({username: null})
    localStorage.removeItem('ubc.username')
  }

  getContent = () => {
    fetch('http://localhost:9000/contents', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      method: 'GET'
    })
        .then((res) => res.json())
        .catch((err) => {
          console.log('[ERROR]', err)
        })
        .then((res) => {
          console.log(res)
          const collection = []
          res.forEach((content, i) => {
            const blogPost = {
              _id: content._id,
              postId: `post${id++}`,
              title: content.title,
              username: content.username,
              date: content.date,
              text: content.text,
              currentId: undefined,
              readOnly: content.username == null || content.username === '' || this.state.username !== content.username,
            }
            collection.push(blogPost)
          })
          this.setState({blogPosts: collection})
        })
  }

  getIdOfPost = (e, id) => {
    let blogPost = this.state.blogPosts.find((x) => x.postId === id)
    if (blogPost == null) {
      console.log('[ERROR] blogPost is null, id:', id)
      return
    }

    this.props.history.push(`/content/${blogPost._id}`)
    e.preventDefault()

    this.setState({addPost: true})
    this.setState({
      edit: true,
      text: blogPost.text,
      title: blogPost.title,
      currentId: blogPost._id,
    })
  }

  editPost = (e) => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let today = `${year}-${month}-${day}`
    if (month < 10) month = '0' + month
    if (day < 10) day = '0' + day

    let editedPost = {
      title: this.state.title,
      username: this.state.username,
      text: this.state.text,
      date: today,
    }
    const temp = JSON.parse(JSON.stringify(this.state))

    fetch(`http://localhost:9000/content/${this.state.currentId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(editedPost),
    })
        .then((res) => res.json())
        .catch((err) => {
          console.log('[ERROR]', err)
        })
        .then((res) => {
          const found = this.state.blogPosts.find(
              (x) => x._id === temp.currentId
          )
          // console.log('after edit, found blog post:', found)
          if (found) {
            found.text = temp.text
            found.title = temp.title
          }
          this.props.history.push('/content')
          console.log('edit response: ', res)
        })

    this.setState({addPost: false})
    this.setState({edit: false, title: '', text: '', currentId: undefined})
  }

  deletePost = (e, id) => {
    fetch(`http://localhost:9000/content/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    })
        .then((res) => res.json())
        .catch((err) => {
          console.log('[ERROR]', err)
        })
        .then((res) => {
          let collection = [...this.state.blogPosts.filter((x) => x._id !== id)]
          this.setState({blogPosts: [...collection]})
          console.log('delete response: ', res)
          // console.log(e.toElement.parentElement.parentElement.parentElement);
        })
  }

  createdPost = () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let today = `${year}-${month}-${day}`

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    let postDiv = document.createElement('div')
    postDiv.id = `post${id++}`
    postDiv.className = 'post'
    postDiv.innerHTML = `<div class="titleDiv"><h2> ${this.state.title}</h2>
    <div class='delete-edit-div'>
    <button class='delete'> X </button>
    <button class='edit'> EDIT </button>
    </div>
    </div>
    <div>
    <span> ${this.state.username} </span>
    <span> ${year}-${month}-${day}</span>
    </div>
    <p>${this.state.text}</p>
    `

    let post = {
      title: this.state.title,
      username: this.state.username,
      text: this.state.text,
      date: today,
    }

    fetch('http://localhost:9000/content', {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(post),
    })
        .then((res) => res.json())
        .catch((err) => {
          console.log('[ERROR]', err)
        })
        .then((res) => {
          console.log('POST content response: ', res)
          if (res.createPost === true) {
            console.log('blog post added:', res.blogPost)
            const collection = this.state.blogPosts
            collection.push(res.blogPost)
            this.setState({blogPosts: collection})

            console.log('createPost is true')
            this.setState({addPost: false})
            // document.getElementById('allContent').appendChild(postDiv)
            this.setState({post: ''})
            this.setState({title: ''})
          }
          console.log('createPost is not True')
        })
        .catch((err) => {
          console.log('[ERROR] 2', err)
        })
  }

  logout = async () => {
    this.forgetUser()
    await fetch('http://localhost:9000/logout', {
      credentials: 'include',
      method: 'POST',
      body: {}
    })
        .then(res => res.json())
        .then((res) => {
          console.log('logout response: ', res)
          // this.props.history.push("/");
        })
        .catch((err) => {
          console.log('[ERROR]', err)
        })
        .finally(() => {
          this.getContent()
        })
  }



  render() {
    const logoutButton = <Button id="homepageButton" variant="contained" onClick={() => { this.logout() }}>
      Log out
    </Button>

    return (
        <div id="content-div">
          <div>
            <header id="header">
              <div
                  style={{width: '13rem', display: 'flex', alignItems: 'center'}}
              >
                <ForumIcon color="secondary" style={{fontSize: '40'}}/>
                <span
                    style={{
                      fontSize: '3rem',
                      fontWeight: '800',
                      marginLeft: '0.4rem',
                    }}
                >
                <img src={logo} alt="Logo" style={{height: '2.1rem'}}/>
              </span>
              </div>
              { this.state.username == null ? <HomePage /> : logoutButton}
            </header>

            <main id="allContent">
              {this.state.blogPosts.map((blogPost) => (
                  <div id={blogPost.postId} className="post" key={blogPost.postId}>
                    <div className="titleDiv">
                      <h2>{blogPost.title}</h2>

                      {!blogPost.readOnly ? (
                          <div className="delete-edit-div">
                            <button
                                className="delete"
                                onClick={(e) => {
                                  this.deletePost(e, blogPost._id)
                                }}
                            >
                              X
                            </button>
                            <button
                                className="edit"
                                onClick={(e) => {
                                  this.getIdOfPost(e, blogPost.postId)
                                }}
                            >
                              EDIT
                            </button>
                          </div>
                      ) : (
                          ''
                      )}
                    </div>
                    <div>
                      <span>{blogPost.username}</span>
                      <span>{blogPost.date}</span>
                    </div>
                    <p>{blogPost.text}</p>
                  </div>
              ))}
            </main>
          </div>

          {this.state.username ? (
              <div className="buttondiv">
                <Button variant="contained" color="secondary"
                        onClick={() => {
                          this.setState({...this.state, addPost: true, title: '', text: '', edit: false})
                        }}
                >
                  Add post
                </Button>
              </div>
          ) : ''}

          {this.state.addPost === true ? (
              <React.Fragment>
                <div className="createPost-div">
                  <h1>Title</h1>
                  <input
                      defaultValue={this.state.title}
                      onChange={(event) =>
                          this.setState({title: event.target.value})
                      }
                      type="text"
                      placeholder="Enter title here..."
                  />
                  <h1>Post</h1>
                  <textarea
                      defaultValue={this.state.text}
                      onChange={(event) =>
                          this.setState({text: event.target.value})
                      }
                      rows="6"
                      column="150"
                      placeholder="Enter post here..."
                  ></textarea>
                  {this.state.edit === false ? (
                      <React.Fragment>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.createdPost}
                            id="createEditPost"
                        >
                          Create Post
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.setState({addPost: false})
                            }}
                            id="cancelPost"
                        >
                          Cancel Post
                        </Button>
                      </React.Fragment>
                  ) : (
                      <React.Fragment>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={this.editPost}
                            id="createEditPost"
                        >
                          Edit Post
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                              this.setState({addPost: false})
                            }}
                            id="cancelPost"
                        >
                          Cancel Post
                        </Button>
                      </React.Fragment>
                  )}
                </div>
              </React.Fragment>
          ) : (
              <React.Fragment></React.Fragment>
          )}
        </div>
    )
  }
}

export default Content
