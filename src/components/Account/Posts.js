import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts, addPostApi } from '../../redux/actions/updateActions';
import { checkIfUserLoggedIn } from '../../redux/actions/authActions';
import PostList from './PostList';

class Posts extends Component {
  state = {
    status: ''
  }

  componentDidMount() {
    this.props.getAllPosts()
    this.props.checkIfUserLoggedIn()
    // this.props.allComments()
  }

  postInput = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  addPost = event => {
    event.preventDefault()
    this.props.addPostApi(this.state.status)
    this.form.reset()
  }

  timeoutError = () => {
    setTimeout(() => {
      window.location.reload('/genrelist')
    }, 100000)
  }

  render() {

    let splitted = window.location.href.split('/')
    let identification = splitted[splitted.length - 1]

    let { posts, error, errorMessage, allComments, postid } = this.props.update
    let { user_id, userPosts } = this.props.user 

    let allPosts;
    
    if(user_id !== identification) {
      allPosts = (
        userPosts.map((item, index) => {
          return (
            <PostList key={item._id} item={item} />
          )
        })
      )
    } else {
      allPosts = (
        posts.map((item, index) => {
          return (
            <PostList key={item._id} item={item} />
          )
        })
      )
    }

    return (
      <div className="mt-5">
        <h2 className="mb-5" style={{fontWeight: 'bold'}}>Posts</h2>

        <div className="container">
          <form style={{display: 'flex', justifyContent: 'center'}} 
              onSubmit={this.addPost} ref={(node) => this.form = node}>

            <input 
              name="status" 
              onChange={this.postInput} 
              className="form-control w-85 p-3" 
              placeholder="What's on your mind?" 
            />
            <button className="btn btn-info ml-3" style={{padding: '0 3%'}}>Share</button>
            
          </form> 

          <br />

          <ul className="list-group">
            {error ? 
              <div>
                <span 
                  className="alert alert-danger w-100" 
                  style={{margin: '1em 0 1em', padding: '10px'}}>
                  {errorMessage}
                </span>
                <script>{this.timeoutError()}</script>
              </div> : 
              allPosts}
          </ul>       
        </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  update: state.update_state,
  user: state.auth_state
})

export default connect(mapStateToProps, { getAllPosts, addPostApi, checkIfUserLoggedIn })(Posts)
