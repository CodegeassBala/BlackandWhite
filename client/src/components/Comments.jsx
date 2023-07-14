import React,{useState,useContext} from "react";
import {Card, Comment} from "semantic-ui-react";
import moment from "moment";
import {AuthContext} from "../context/auth";
import DeleteButton from "../views/DeleteButton";
import CommentForm from "./CommentForm";
function createTree(list) {
  // console.log(list);
  var map = {},
    node,
    roots = [],
    i

  for (i = 0; i < list.length; i += 1) {
    map[list[i].id] = i // initialize the map
    list[i].children = [] // initialize the children
  }
    // console.log(list);
  for (i = 0; i < list.length; i += 1) {
    node = list[i]
    // console.log(parentID);
    if (node.parentID != "null" && node.parentID != null) {

      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentID]].children.push(node)
    } else {
      roots.push(node)
    }
}
// console.log(roots);
return roots;
}




function CustomComment(props) {
  const comment = props.comment;
  const postId = props.id;
  const [show,setShow] = useState(false);
  // console.log(props.comment);
    const {user} = useContext(AuthContext); 
    const handleClick = (e)=>{
        if(show)setShow(false);
        else setShow(true);
    }
    const nestedComments = (comment.children || []).map((comment) => {
      return(
        <div style={{marginLeft:'16px',marginTop:'2px'}}>
        {/* <Card> */}
    <CustomComment key={comment.id} comment={comment} type="child" />
        {/* </Card> */}
         </div>
      ) 
    });
    
    return (
      <div style={{marginLeft:'16px',marginTop:'16px'}}>
        <Comment.Group threaded>
          <div style={{"border":"1px solid grey" ,"padding":"5px"}}>
        <Comment>
        {/* <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/daniel.jpg'/> */}
      <Comment.Content>
        <Comment.Author>{comment.username}</Comment.Author>
        {/* <Comment.Metadata>
        {moment(comment.createdAt).fromNow()}
        </Comment.Metadata> */}
        <Comment.Text>{comment.body}</Comment.Text>
        <button
        style={{
          // "background-color": "#606C5D",
          "color": "#606C5D",
          // "border": "1px solid"
        }} 
        onClick={handleClick}>Reply</button>
        {show && <CommentForm postID={postId} parentID={comment.id}></CommentForm>}
      </Comment.Content>
    </Comment>
    </div>
    <Comment.Group>
      {nestedComments}
      </Comment.Group>
      </Comment.Group>
       </div>
    )
  }

  function Comments(props){
      const comments = props.comments;
      const postId = props.postID;
      let tempComments = JSON.parse(JSON.stringify(comments));
      // console.log(tempComments[0].parentID);
    const commentTree = createTree(tempComments);
      return(
        <div style={{ fontFamily: 'sans-serif',marginTop:'100px' }}>
          <h2>Comments</h2>
        {commentTree.map((comment) => {
          return <CustomComment key={comment.id} comment={comment} id={postId}/>
        })}
      </div>
      )
  }

  export default Comments;
  
