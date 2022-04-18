<?php
	// Include config.php file
	include_once 'config.php';

	// Create a class Users
	class Database extends Config {
	  // Fetch all or a single * from database
	  public function fetch($id = 0) {
	    $sql = 'SELECT * FROM todo';
	    if ($id != 0) {
	      $sql .= ' WHERE id = :id';
	    }
	    $stmt = $this->conn->prepare($sql);
	    if ($id != 0)
	    	$stmt->execute(['id' => $id]);
	    else
	    	$stmt->execute();
	    $rows = $stmt->fetchAll();
	    return $rows;
	  }

	  // Insert an * in the database
	  public function insert($info, $icon, $sucess) {
	    $sql = 'INSERT INTO todo (info, icon, sucess) VALUES (:info, :icon, :sucess)';
	    $stmt = $this->conn->prepare($sql);
	    $stmt->execute(['info' => $info, 'icon' => $icon, 'sucess' => $sucess]);
	    return true;
	  }

	  // Update an * in the database
	  public function update($info, $icon, $sucess, $id) {
	    $sql = 'UPDATE todo SET info = :info, icon = :icon, sucess = :sucess WHERE id = :id';
	    $stmt = $this->conn->prepare($sql);
	    $stmt->execute(['info' => $info, 'icon' => $icon, 'sucess' => $sucess, 'id' => $id]);
	    return true;
	  }

	  // Delete an * from database
	  public function delete($id) {
	    $sql = 'DELETE FROM todo WHERE id = :id';
	    $stmt = $this->conn->prepare($sql);
	    $stmt->execute(['id' => $id]);
	    return true;
	  }
	}

?>