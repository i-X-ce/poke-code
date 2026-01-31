import { Stack, Typography } from "@mui/material"

const IconAndText = ({ icon, text, size = "medium" }: { icon: React.ReactNode, text: string | number, size?: "small" | "medium" }) => {
    return (
        <Stack direction={"row"} sx={{ color: "GrayText" }} gap={1} alignItems={"center"}>
            {icon}
            <Typography fontSize={size}>{text}</Typography>
        </Stack>
    )
}

export default IconAndText