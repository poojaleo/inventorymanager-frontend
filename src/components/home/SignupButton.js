import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";

const SignupButton = () => {
    const navigate = useNavigate();

    const routeToSignupPage = () => {
        let path = '/signup';
        navigate(path);
    }

    return (
        <div>
            <Button className={"mx-2 mt-4"} color={"primary"} type={"submit"} onClick={routeToSignupPage}>Signup</Button>
        </div>
    )
}

export default SignupButton;