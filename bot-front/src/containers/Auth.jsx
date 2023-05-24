import 'react-phone-input-2/lib/material.css'
import SignIn from "../components/signIn.jsx";
import SignUp from "../components/signUp.jsx";
import {Button, Grid} from "@mui/material";
import {useState} from "react";

const Auth = () => {
    const [signIn, setSignIn] = useState(false);

    return <div>
        {signIn ? <SignIn/> : <SignUp/>}
        <Grid container justifyContent='center'>
            <Grid item>
                <Button type='link' onClick={() => setSignIn(!signIn)} sx={{textTransform: 'initial'}}>
                    {signIn ? "Don't have an account? Sign Up" : "Already have an account? Sign in"}
                </Button>
            </Grid>
        </Grid>
    </div>
};

export default Auth;