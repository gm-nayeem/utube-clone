import React, { useEffect, useState } from "react";
import styled from "styled-components";
import newRequest from "../utils/request";
import Card from "./Card";


const Container = styled.div`
  flex: 2.5;
`;

const Recommendation = ({ tags }) => {
    const [videos, setVideos] = useState([]);

    // fetch tags videos
    useEffect(() => {
        const fetchVideos = async () => {
            const res = await newRequest.get(`/videos/tags?tags=${tags}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [tags]);

    return (
        <Container>
            {
                videos.map((video) => (
                    <Card type="sm" key={video._id} video={video} />
                ))
            }
        </Container>
    );
};

export default Recommendation;