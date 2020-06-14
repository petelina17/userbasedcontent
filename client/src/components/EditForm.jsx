import React, {useContext, useState, useEffect} from 'react'
import StateContext from '../contexts/StateContext'
import {Button} from '@material-ui/core'

export const EditForm = (props) => {
  const context = useContext(StateContext)
  const [state, setState] = useState({
    title: '',
    text: '',
    edit: false
  })

  const close = () => {
    //
  }

  const cancel = () => {
    props.history.push('/content')
  }

  const createdPost = async () => {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let today = `${year}-${month}-${day}`

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    let post = {
      title: state.title,
      username: context.username,
      text: state.text,
      date: today,
    }

    await fetch('http://localhost:9000/content', {
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
            return
          }
        })
        .catch((err) => {
          console.log('[ERROR] 2', err)
        })

    props.history.push('/content')
  }

  const editPost = () => {

  }

  return (
      <div className="createPost-div">
        <h1>Title</h1>
        <input
            defaultValue={state.title}
            onChange={(event) =>
                setState({...state, title: event.target.value})
            }
            type="text"
            placeholder="Enter title here..."
        />
        <h1>Post</h1>
        <textarea
            defaultValue={state.text}
            onChange={(event) =>
                setState({...state, text: event.target.value})
            }
            rows="6"
            column="150"
            placeholder="Enter post here..."
        />
        {state.edit === false ? (
            <>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={createdPost}
                  id="createEditPost"
              >
                Create Post
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={cancel}
                  id="cancelPost"
              >
                Cancel Post
              </Button>
            </>
        ) : (
            <>
              <Button
                  variant="contained"
                  color="secondary"
                  onClick={editPost}
                  id="createEditPost"
              >
                Edit Post
              </Button>
              <Button
                  variant="contained"
                  color="primary"
                  onClick={close}
                  id="cancelPost"
              >
                Cancel Post
              </Button>
            </>
        )}
      </div>
  )
}

export default EditForm
