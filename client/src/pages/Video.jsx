import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  ThumbUpOutlined,
  ThumbDownOffAltOutlined,
  ReplyOutlined,
  AddTaskOutlined,
  ThumbUp,
  ThumbDown
} from "@mui/icons-material";
import Comments from "../components/Comments";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest, userRequest } from "../utils/request";
import { like, dislike, fetchSuccess } from "../redux/videoSlice"
import Recommendation from "../components/Recommendation";
import { format } from "timeago.js";
import {subscription} from "../redux/userSlice";


const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 4.5;
`;

const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const [channel, setChannel] = useState({});
  const dispatch = useDispatch();

  const videoId = useLocation().pathname.split("/")[2];

  
  // update views, fetch video and channel user
  useEffect(() => {
    const fetchData = async () => {
      try {
        await publicRequest.put(`/videos/view/${videoId}`);
        const videoRes = await publicRequest.get(`/videos/find/${videoId}`);
        const channelRes = await publicRequest.get(`/users/find/${videoRes.data.userId}`);

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
      } catch (err) { console.log(err) }
    };
    fetchData();
  }, [videoId, dispatch]);

  // handle like
  const handleLike = async () => {
    await userRequest.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  // handle dislike
  const handleDislike = async () => {
    await userRequest.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  // handle subscribers
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await userRequest.put(`/users/unsub/${channel._id}`)
      : await userRequest.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl}
            autoPlay
            progress
            controls
          />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>
            {currentVideo?.views} views • {format(currentVideo?.createdAt)}
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <ThumbUp />
              ) : (
                <ThumbUpOutlined />
              )}{" "}
              {currentVideo?.likes.length}
            </Button>
            <Button onClick={handleDislike}>
              {
                currentVideo?.dislikes.includes(currentUser?._id) ? (
                  <ThumbDown />
                ) : (
                  <ThumbDownOffAltOutlined />
                )
              }{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlined /> Share
            </Button>
            <Button>
              <AddTaskOutlined /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img} />
            <ChannelDetail>
              <ChannelName>{channel?.name}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>
            {
              currentUser?.subscribedUsers?.includes(channel?._id)
                ? "SUBSCRIBED"
                : "SUBSCRIBE"
            }
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;