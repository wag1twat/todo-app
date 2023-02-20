import {
    CheckCircleFilled,
    CloseCircleFilled
} from "@ant-design/icons/lib/icons";
import { Icon } from "@chakra-ui/icons";
import { IconProps } from "@chakra-ui/react";

interface CompletedIconProps extends IconProps {
    isCompleted: boolean;
}

const CompletedIcon: React.FC<CompletedIconProps> = ({
    isCompleted,
    ...props
}) => {
    return isCompleted ? (
        <Icon
            as={CheckCircleFilled}
            fontSize="16px"
            color="green.500"
            {...props}
        />
    ) : (
        <Icon
            as={CloseCircleFilled}
            fontSize="16px"
            color="red.400"
            {...props}
        />
    );
};

export { CompletedIcon };
