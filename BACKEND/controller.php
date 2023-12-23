<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

	function optionsCatalogue (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	function hello(Request $request, Response $response, $args) {
	    $array = [];
	    $array ["nom"] = $args ['name'];
	    $response->getBody()->write(json_encode ($array));
	    return $response;
	}

	// API Nécessitant un Jwt valide
	function getCatalogue (Request $request, Response $response, $args) {
		$queryParams = $request->getQueryParams();

	    $catalogue = json_decode('[ { "id": 1, "name": "Ordinateur portable", "description": "Un ordinateur portable fiable pour vos besoins quotidiens", "price": 499.99 }, { "id": 2, "name": "Casque audio", "description": "Un casque audio avec une qualité de son exceptionnelle", "price": 249.99 }, { "id": 3, "name": "Clavier sans fil", "description": "Un clavier sans fil pour une meilleure expérience utilisateur", "price": 29.99 }, { "id": 4, "name": "Souris bluetooth", "description": "Une souris bluetooth pour une meilleure expérience utilisateur", "price": 19.99 }, { "id": 5, "name": "Disque dur SSD", "description": "Un disque dur SSD de 512Go", "price": 149.99 }, { "id": 6, "name": "Tablette Samsung", "description": "Une tablette Samsung Galaxy Tab S6", "price": 399.99 }, { "id": 7, "name": "Chargeur Samsung", "description": "Un chargeur Samsung 45W", "price": 79.99 }, { "id": 8, "name": "Écouteurs Samsung", "description": "Des écouteurs Samsung Galaxy Buds+", "price": 129.99 }, { "id": 9, "name": "Écouteurs Apple", "description": "Des écouteurs Apple AirPods Pro", "price": 199.99 }, { "id": 10, "name": "Chargeur Apple", "description": "Un chargeur Apple 20W", "price": 29.99 }, { "id": 11, "name": "Tablette Apple", "description": "Une tablette Apple iPad Pro", "price": 899.99 }, { "id": 12, "name": "Ordinateur portable Apple", "description": "Un ordinateur portable Apple MacBook Pro", "price": 1499.99 }, { "id": 13, "name": "Clavier Apple", "description": "Un clavier Apple Magic Keyboard", "price": 99.99 } ]', true);

		if (!empty($queryParams)) {
			$filteredCatalogue = array_filter($catalogue, function ($item) use ($queryParams) {
	
				if (!empty($queryParams['id']) && $item['id'] != $queryParams['id']) {
					return false;
				}
				if (!empty($queryParams['name']) && stripos($item['name'], $queryParams['name']) === false) {
					return false;
				}
				if (!empty($queryParams['description']) && stripos($item['description'], $queryParams['description']) === false) {
					return false;
				}
				if (!empty($queryParams['price']) && strpos((string) $item['price'], (string) $queryParams['price']) === false) {
					return false;
				}				  
	
				return true;
			});
			$response->getBody()->write(json_encode($filteredCatalogue));
		} else {
			$response->getBody()->write(json_encode($catalogue));
		}
	
		return addHeaders($response);
	}
	
	function optionsUtilisateur (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	// API Nécessitant un Jwt valide
	function getUtilisateur (Request $request, Response $response, $args) {
	    
	    $payload = getJWTToken($request);
	    $login  = $payload->userid;
	    
		$flux = '{"nom":"martin","prenom":"jean"}';
	    
	    $response->getBody()->write($flux);
	    
	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin (Request $request, Response $response, $args) {   
	    
		$flux = '{"nom":"martin","prenom":"jean"}';
	    
	    $response = createJwT ($response);
	    $response->getBody()->write($flux );
	    
	    return addHeaders ($response);
	}

