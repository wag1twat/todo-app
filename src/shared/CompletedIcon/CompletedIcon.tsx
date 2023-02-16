import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

interface CompletedIconProps {
    isCompleted: boolean;
}

const CompletedIcon: React.FC<CompletedIconProps> = ({ isCompleted }) => {
    return isCompleted ? (
        <CheckCircleIcon color="green.500" />
    ) : (
        <CloseIcon color="red.400" />
    );
};

export { CompletedIcon };
