import Header from "../components/UI/Header.jsx";
import {Container, Typography} from "@mui/material";

const SuccessPage = () => {
    return (
        <Container component="div" maxWidth="xl">
            <Header/>
            <Typography>
                Bot successfully started!
            </Typography>
        </Container>
    );
};

export default SuccessPage;