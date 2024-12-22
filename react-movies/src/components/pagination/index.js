import React from 'react';
import { Pagination, Box, Typography } from '@mui/material';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 4 
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Page: {currentPage}
      </Typography>
      <Pagination
        count={totalPages} // Total number of pages
        page={currentPage} // Current page
        onChange={onPageChange} // Handler for page change
        color="primary"
        shape="rounded"
        variant="outlined"
      />
    </Box>
  );
};

export default PaginationComponent;
