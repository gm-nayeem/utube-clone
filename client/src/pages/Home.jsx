import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import {publicRequest, userRequest} from "../utils/request";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({type}) => {
    const [videos, setVideos] = useState([]);

    // fetch videos
    useEffect(() => {
        const fetchVideos = async () => {
            if(type === "sub") {
                const res = await userRequest.get(`/videos/${type}`)
                setVideos(res.data);
            } else {
                const res = await publicRequest.get(`/videos/${type}`)
                setVideos(res.data);
            }               
        };
        fetchVideos();
    }, [type]);

    return (
        <Container>
            {
                videos.map(video => (
                    <Card key={video._id} video={video} />
                ))
            }
        </Container>
    );
};

export default Home;