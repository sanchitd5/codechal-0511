import { API } from 'helpers/index';
import { Container, Grid, Button, CircularProgress } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Post from 'models/post';
import { CustomTable } from 'components/index';

const PostScreen = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState(undefined);
    const getPost = useCallback(async () => {
        const response = await API.getPost(userId);
        if (response.success) {
            setPostData(response.data.map(post => new Post(post)));
        }
    }, [userId]);
    useEffect(() => {
        getPost();
    }, [getPost]);

    return <Container>
        <Grid container>
            <Grid item xs={12}>
                <Button variant='contained' onClick={() => navigate(-1)}>
                    Back
                </Button>
            </Grid>
            <Grid item xs={12}>
                {postData ? <CustomTable title='Posts' data={postData} /> : <CircularProgress />}
            </Grid>
        </Grid>
    </Container>;

};

export default PostScreen;