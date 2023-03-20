import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import newRequest from "../utils/request";
import { useSelector } from "react-redux";


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);

  // fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await newRequest.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { console.log(err) }
    };
    fetchComments();
  }, [videoId]);

  //TODO: ADD NEW COMMENT FUNCTIONALITY

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <Input placeholder="Add a comment..." />
      </NewComment>
      {
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      }
    </Container>
  );
};

export default Comments;