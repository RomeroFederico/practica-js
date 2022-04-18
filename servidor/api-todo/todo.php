<?php
	// Include CORS headers
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
	header('Access-Control-Allow-Headers: X-Requested-With');
	header('Content-Type: application/json');

	// Include action.php file
	include_once 'db.php';
	// Create object of * class
	$todo = new Database();

	// create a api variable to get HTTP method dynamically
	$api = $_SERVER['REQUEST_METHOD'];

	// get id from url
	$id = intval($_GET['id'] ?? '');

	// Get all or a single * from database
	if ($api == 'GET') {
	  if ($id != 0) {
	    $data = $todo->fetch($id);
	  } else {
	    $data = $todo->fetch();
	  }
	  echo json_encode($data);
	}

	// Add a new todo into database
	if ($api == 'POST') {

		$input = file_get_contents("php://input");
 		$arr = json_decode($input,true);
		$info = $arr['info'];
		$icon = $arr['type'];
		$sucess = $arr['sucess'];

	  if ($todo->insert($info, $icon, $sucess)) {
	    echo $todo->message('todo added successfully!',false);
	  } else {
	   echo $todo->message('Failed to add an todo!',true);
	  }
	}

	// Update an todo in database
	if ($api == 'PUT') {
		$input = file_get_contents("php://input");
	 	$arr = json_decode($input,true);
		$info = $arr['info'];
		$icon = $arr['type'];
		$sucess = $arr['sucess'];

	  if ($id != null) {
	    if ($todo->update($info, $ico, $sucess, $id)) {
	      echo $todo->message('todo updated successfully!',false);
	    } else {
	      echo $todo->message('Failed to update an todo!',true);
	    }
	  } else {
	    echo $todo->message('todo not found!',true);
	  }
	}

	// Delete an todo from database
	if ($api == 'DELETE') {
	  if ($id != null) {
	    if ($todo->delete($id)) {
	      echo $todo->message('todo deleted successfully!', false);
	    } else {
	      echo $todo->message('Failed to delete an todo!', true);
	    }
	  } else {
	    echo $todo->message('todo not found!', true);
	  }
	}

?>