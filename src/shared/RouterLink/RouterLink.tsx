import { Button, ButtonProps } from "@chakra-ui/react";
import { LinkProps, useNavigate } from "react-router-dom";

const RouterLink: React.FC<ButtonProps & { to: LinkProps["to"] }> = ({
    to,
    ...props
}) => {
    const navigate = useNavigate();
    return (
        <Button
            variant={"link"}
            colorScheme="cyan"
            onClick={() => navigate(to)}
            minWidth="unset"
            {...props}
        />
    );
};

export { RouterLink };
