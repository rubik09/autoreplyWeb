import Header from "../components/UI/Header.jsx";
import {Container, Typography} from "@mui/material";

const SuccessPage = () => {
    return (
        <Container component="div" maxWidth="xl" sx={{textAlign: 'center'}}>
            <Header/>
            <Typography component="h1" variant="h4" sx={{mt: 5}}>
                Bot successfully started!
            </Typography>
        </Container>
    );
};

export default SuccessPage;
