import { Link } from "@chakra-ui/react";
import { Link as RrdLink, LinkProps as RrdLinkProps } from "react-router-dom";

const RouterLink: React.FC<RrdLinkProps> = (props) => {
    return <Link as={RrdLink} {...props} />;
};

export { RouterLink };
