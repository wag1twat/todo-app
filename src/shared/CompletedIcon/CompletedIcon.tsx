import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";
import { IconProps } from "@chakra-ui/react";

interface CompletedIconProps {
    isCompleted: boolean;
}

const CompletedIcon: React.FC<CompletedIconProps> = ({ isCompleted }) => {
    return isCompleted ? (
        <CheckCircleIcon fontSize={12} color="green.500" />
    ) : (
        <CloseIcon fontSize={12} color="red.400" />
    );
};

export { CompletedIcon };
