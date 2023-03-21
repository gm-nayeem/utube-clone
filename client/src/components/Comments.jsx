import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { publicRequest, userRequest } from "../utils/request";
import { useSelector } from "react-redux";


const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const NewCommentForm = styled.form`
  width: 100%;
  padding: 0px 10px 0px 10px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.textSoft};
  color: ${({ theme }) => theme.text};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;

  &:focus {
    border-bottom: 2px solid ${({ theme }) => theme.text};
  }
`;

const Buttons = styled.div`
  position: absolute;
  right: 0;
  top: 40px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  display: ${props => !props.isOpen && "none"};
`;

const Button = styled.span`
  background-color: #3ea6ff;
  color: #302f2fe3;
  font-weight: 500;
  width: max-content;
  padding: 12px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #302f2fe3;
    color: white;
  }
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // fetch comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await publicRequest.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (err) { console.log(err) }
    };
    fetchComments();
  }, [videoId]);

  // submit new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const commnet = {
      videoId,
      desc: newComment
    }
    const res = await userRequest.post(`/comments`, commnet);
    setComments((prev) => [...prev, res.data]);

    setNewComment("");
    setIsOpen(false);
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser.img} />
        <NewCommentForm>
          <Input placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onClick={() => setIsOpen(true)}
          />
          <Buttons isOpen={isOpen}>
            <Button 
              onClick={() => {
                setNewComment("")
                setIsOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Comment</Button>
          </Buttons>
        </NewCommentForm>
      </NewComment>
      {
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      }
    </Container>
  );
};

export default Comments;