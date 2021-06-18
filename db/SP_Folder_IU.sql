CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Folder_IU`(
    IN _id INT,
    IN _name VARCHAR(45)
)
BEGIN
	IF ( _id = 0 )
		THEN
			INSERT INTO folders (name) values (_name);
            SET _id = LAST_INSERT_ID();
		ELSE
			UPDATE folders
            SET 
				name = _name
			WHERE id = _id;
	END IF;
     SELECT _id AS id;
END