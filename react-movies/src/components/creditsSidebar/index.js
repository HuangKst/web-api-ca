import React from 'react';
import { Grid, Typography, Avatar, Box, List, ListItem, ListItemText, Card, CardContent } from '@mui/material';
import CreditHeader from '../headerCredits';

const CreditsSlider = ({ data, children }) => {
  if (!data) return null;
  

  return (
    <>
      <CreditHeader credit={data} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        {/* left to show the info of the credit */}
        <Grid item xs={3}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Card sx={{ padding: 2, borderRadius: 3, boxShadow: 3 }}>
              <Box display="flex" justifyContent="center" mb={2}>
                {data.profile_path && (
                  <Avatar
                    src={`https://image.tmdb.org/t/p/w300${data.profile_path}`}
                    alt={data.name}
                    sx={{ width: 100, height: 100 }}
                  />
                )}
              </Box>
              <CardContent>
                {data.known_for_department && (
                  <Typography variant="subtitle1" gutterBottom>
                    Known For: {data.known_for_department}
                  </Typography>
                )}
                {data.known_credits && (
                  <Typography variant="subtitle1" gutterBottom>
                    Known Credits: {data.known_credits}
                  </Typography>
                )}
                {data.gender && (
                  <Typography variant="subtitle1" gutterBottom>
                    Gender: {data.gender === 1 ? "Female" : "Male"}
                  </Typography>
                )}
                {data.birthday && (
                  <Typography variant="subtitle1" gutterBottom>
                    Birthday: {data.birthday}
                  </Typography>
                )}
                {data.place_of_birth && (
                  <Typography variant="subtitle1" gutterBottom>
                    Place of Birth: {data.place_of_birth}
                  </Typography>
                )}
                {data.also_known_as && data.also_known_as.length > 0 && (
                  <>
                    <Typography variant="subtitle1" gutterBottom>
                      Also Known As:
                    </Typography>
                    <List dense>
                      {data.also_known_as.map((alias, index) => (
                        <ListItem key={index}>
                          <ListItemText primary={alias} />
                        </ListItem>
                      ))}
                    </List>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* right component */}
        <Grid item xs={9}>{children}</Grid>
      </Grid>
    </>
  );
};

export default CreditsSlider;
