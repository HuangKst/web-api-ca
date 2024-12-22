
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";

const CreditHeader = (props) => {
    const credit = props.credit;
    const navigate = useNavigate();

    return(
        <Paper
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}>

        <IconButton aria-label="go back" onClick={() => navigate(-1)} >
            <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <Typography variant="h4" component="h3">
            {credit.name}
            {credit.homepage && (
                    <a href={credit.homepage} target="_blank" rel="noopener noreferrer">
                        <HomeIcon color="primary" />
                    </a>
                )}
            <br />
            
        </Typography>

        <IconButton aria-label="go forward" onClick={() => navigate(+1) } >
            <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>


            
        </Paper>
    )


}
export default CreditHeader;