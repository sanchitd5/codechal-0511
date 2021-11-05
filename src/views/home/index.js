import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/customTable';
import User from 'models/user';
import API from 'helpers/api';
import { TextField } from '@mui/material';

const Home = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [processedData, setProcessedData] = useState();
  const [search, setSearch] = useState('');
  const getUsers = useCallback(async () => {
    const response = await API.getUsers();
    if (response.success) {
      setUserData(response.data.map(user => new User(user)));
    } else {
      setUserData([]);
    }
  }, []);
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (userData) {
      setProcessedData(userData.filter(user => user['Name'].toLowerCase().includes(search.toLowerCase())));
    }
  }, [userData, search]);

  let view = (<Container >
    <Grid container>
      <Grid item xs={12}>
        <TextField value={search} onChange={(e) => setSearch(e.target.value)} label='Search by Name' />
      </Grid>
      <Grid item xs={12}>
        {userData ? <CustomTable title='Users' data={processedData}
          options={{
            ignoreKeys: ['id'],
            actions: [
              {
                name: 'Actions',
                label: 'Show Posts',
                function: (event, data) => {
                  navigate(`/post/${data.id}`);
                }
              }
            ]
          }} />
          : <CircularProgress />}
      </Grid>
    </Grid>


  </Container>);
  return view;
};

export default Home;