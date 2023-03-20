import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";
import {publicRequest} from "../utils/request";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search;
    console.log(query);

    useEffect(() => {
        const fetchVideos = async () => {
            const res = await publicRequest.get(`/videos/search${query}`);
            setVideos(res.data);
        };
        fetchVideos();
    }, [query]);

    return <Container>
        {videos.map(video => (
            <Card key={video._id} video={video} />
        ))}
    </Container>;
};

export default Search;