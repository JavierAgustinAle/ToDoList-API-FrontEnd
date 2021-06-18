CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Folder_D`(
   IN _id INT
)
BEGIN
	DECLARE tasksInFolder INT DEFAULT 0;

	SELECT COUNT(*) 
	INTO tasksInFolder
	FROM tasks where FolderID = _id;
	IF tasksInFolder > 0 
		THEN
			DELETE FROM tasks WHERE FolderID = _id;
            DELETE FROM folders WHERE id = _id;
		ELSE
			DELETE FROM folders WHERE id = _id;
	END IF;
END