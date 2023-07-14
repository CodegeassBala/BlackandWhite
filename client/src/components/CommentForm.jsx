import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { useLocation } from "wouter";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Grid,
  Icon,
  Image,
  Label,
  Form,
} from "semantic-ui-react";
import moment from "moment";
import LikeButton from "../views/LikeButton";
import DeleteButton from "../views/DeleteButton";
import Comments from "./Comments";
import { useHistory } from "react-router";
import { useMutation } from "@apollo/client";

function CommentForm(props) {
    // console.log(props);
    const {user} = useContext(AuthContext); 
    const postID = props.postID;
    const parentID = props.parentID;
    // console.log(parentID);
    const [comment,setComment] = useState("");
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION,{
        update(){
            setComment("");
        },
        variables:{
            postID,
            body:comment,
            parentID:parentID
        }
    })

  return (
user &&
    <Card fluid>
      <Card.Content>
        <p>Post a comment</p>
        <Form>
          <div className="ui action input fluid">
            <input
              type="text"
              placeholder="Comment .."
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></input>
            <button
              type="submit"
              className="ui button black"
              disabled={comment.trim() == ""}
              onClick={submitComment}
            >
              Submit
            </button>
          </div>
        </Form>
      </Card.Content>
    </Card>
  );
}


const SUBMIT_COMMENT_MUTATION = gql`
    mutation($postID:String!,$body:String!,$parentID:String!){
        commentPost(postID:$postID,body:$body,parentID:$parentID){
            id
            comments{
                id body createdAt username
            }
            commentCount
        }
    }
`
export default CommentForm;