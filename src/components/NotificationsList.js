import {
    Text,
    Heading,
    Button,
    Box,
    Modal,
    LinkOverlay,
    LinkBox,
    Stack
} from "@chakra-ui/react";


export default function NotificationsList({ token, notifications }) {

if (notifications && notifications.length > 0) {
    return (
        <Box className="modal-base" p={0} paddingBottom={2}>
        <Heading className="form-banner" >Notifications</Heading>
            {notifications.map((obj) => (
                <Box m={2} bg='#E6FFFA' borderRadius='20px' p={4}>
                    <Text color='#285E61'>{obj.message}</Text>
                </Box>
            ))}
        </Box>
    );}
if (notifications && notifications.length === 0) {
    return (
        <Box className="modal-base" p={0} paddingBottom={2}>
        <Heading className="form-banner" >Notifications</Heading>
            
                <Box m={2} bg='#E6FFFA' borderRadius='20px' p={4}>
                    <Text color='#285E61'>Inbox Empty!</Text>
                </Box>
         
        </Box>
    );
}
}
