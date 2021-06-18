CREATE DEFINER=`root`@`localhost` PROCEDURE `TaskIU`(
	IN _id INT,
    IN _description VARCHAR(45),
    IN _completed BOOL,
    IN _folderID INT(11)
)
BEGIN
	IF ( _id = 0 )
		THEN
			INSERT INTO tasks (description, completed, folderID) values (
            _description, _completed, _folderID);
            SET _id = LAST_INSERT_ID();
		ELSE
			UPDATE tasks
            SET 
				description = _description,
                completed = _completed,
                folderID = _folderID
			WHERE id = _id;
	END IF;
    
    SELECT _id AS id;
END