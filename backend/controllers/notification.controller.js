export const getNotifications = async (req, res) => {
    try{
        const userId = req.user._id;
        const notifications = await Notification.find({to: userId}).populate({
            path: "from",
            select: "username profilePic",                          
        });
        await Notification.updateMany({to: userId}, {read: true});
        res.status(200).json(notifications);
    }
    catch(error){
        console.log("Error in getNotification", error.message);
        return res.status(500).json({error: error.message});
    }
}

export const deleteNotifications = async (req, res) => {
    try{
        const userId = req.user._id;
        await Notification.deleteMany({to: userId});
        res.status(200).json({message: "Notifications deleted successfully"});
    }
    catch(error){
        console.log("Error in deleteNotification", error.message);
        return res.status(500).json({error: error.message});
    }
}