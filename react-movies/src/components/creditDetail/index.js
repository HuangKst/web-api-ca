import React from "react";
import {  Typography} from '@mui/material';

const CreditDetail = ({credit}) =>{
    if (!credit) return null;
    

    return (
     <>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 2 }}>
            {credit.name}
        </Typography>
        {credit.biography && (
            <>
                <Typography variant="h4" gutterBottom>
                Biography
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                {credit.biography}
                </Typography>
            </>
        )}
        
      </>
    );

}

export default CreditDetail;