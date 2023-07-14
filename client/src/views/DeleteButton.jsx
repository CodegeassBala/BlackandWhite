import React,{useState} from "react";
import {gql,useMutation} from '@apollo/client'
import {Button,Confirm,Icon} from 'semantic-ui-react'
import {FETCH_POSTS_QUERY} from '../utils/getPostmutation';

function DeleteButton(props){
    // console.log(props);
    const callBack = props.callBack;
    const postID = props.postID;
    const commentID = props.commentId;
    const [confirmOpen,setConfirmOpen] = useState(false);
    let mutation = commentID ? DELETE_COMMENT : DELETE_POST;
    const [deletePC] = useMutation(mutation,{
        variables:{postID,commentID},
        update:(store,{data})=>{
            setConfirmOpen(false);
            if(!commentID){
                const postData = store.readQuery({
                    query:FETCH_POSTS_QUERY
                });
                postData.getPosts = postData.getPosts.filter((p)=>p.id!== postID);
                store.writeQuery({
                    query:FETCH_POSTS_QUERY, postData
                });
            }
            if(callBack)callBack();
        },
        variables:{
            postID,
            commentID
        }
    });

    return(
        <>
        <Button as = 'div' color='black' onClick={()=>setConfirmOpen(true)} floated='right'> 
      <Icon name = 'trash' style={{margin:0}}/>
      </Button>
      <Confirm
      open={confirmOpen}
      onCancel={()=>setConfirmOpen(false)}
      onConfirm={deletePC}/>
      </>
    )

}

const DELETE_POST=gql`
mutation deletePost($postID:ID!){
    deletePost(postID:$postID)
}
`
const DELETE_COMMENT = gql`
mutation deleteComment($postID:ID!,$commentID:ID!){
    deleteComment(postID:$postID,commentID:$commentID)
}
`

export default DeleteButton;