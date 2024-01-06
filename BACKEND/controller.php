<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

require_once '../bootstrap.php';

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
	// API pour obtenir le catalogue
	function getCatalogue(Request $request, Response $response, $args) {
		global $entityManager;
		$catalogueRepository = $entityManager->getRepository('Catalogue');
		
		$queryParams = $request->getQueryParams();
		$queryBuilder = $catalogueRepository->createQueryBuilder('c');

	
		if (!empty($queryParams['id'])) {
			$queryBuilder->andWhere('c.id = :id')
						 ->setParameter('id', $queryParams['id']);
		}
		if (!empty($queryParams['name'])) {
			$queryBuilder->andWhere('c.name LIKE :name')
						 ->setParameter('name', '%' . $queryParams['name'] . '%');
		}
		if (!empty($queryParams['description'])) {
			$queryBuilder->andWhere('c.description LIKE :description')
						 ->setParameter('description', '%' . $queryParams['description'] . '%');
		}	
		$catalogueItems = $queryBuilder->getQuery()->getResult();
		
		$catalogueArray = [];
		foreach ($catalogueItems as $item) {
			$catalogueArray[] = [
				'id' => $item->getId(),
				'name' => $item->getName(),
				'description' => $item->getDescription(),
				'price' => $item->getPrice(),
			];
		}
	
		$response->getBody()->write(json_encode($catalogueArray));
		return addHeaders($response);
	}
	
	function optionsUtilisateur (Request $request, Response $response, $args) {
	    
	    // Evite que le front demande une confirmation à chaque modification
	    $response = $response->withHeader("Access-Control-Max-Age", 600);
	    
	    return addHeaders ($response);
	}

	// APi d'authentification générant un JWT
	function postLogin(Request $request, Response $response, $args) {   
		global $entityManager;
		$data = $request->getParsedBody();
	
		$login = $data['login'] ?? "";
		$password = $data['password'] ?? "";
	
		if (!preg_match("/[a-zA-Z0-9]{1,20}/", $login) || !preg_match("/[a-zA-Z0-9]{1,20}/", $password)) {
			return $response->withStatus(400)
							->withHeader('Content-Type', 'application/json')
							->write(json_encode(['error' => 'Invalid input format']));
		}
	
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		$utilisateur = $utilisateurRepository->findOneBy(['login' => $login]);
	
		if ($utilisateur && password_verify($password, $utilisateur->getPassword())) {
			$userData = [
				'id' => $utilisateur->getId(),
				'nom' => $utilisateur->getNom(),
				'prenom' => $utilisateur->getPrenom()
			];
	
			$response = createJwt($response, $userData);
			$response = $response->withHeader('Content-Type', 'application/json');
			$response->getBody()->write(json_encode($userData));
		} else {
			return $response->withStatus(401)
							->withHeader('Content-Type', 'application/json')
							->write(json_encode(['error' => 'Login failed']));
		}
	
		return addHeaders($response);
	}
	
	function postRegister(Request $request, Response $response, $args) {
		global $entityManager;
		$data = $request->getParsedBody();
		
		$nom = $data['nom'] ?? "";
		$prenom = $data['prenom'] ?? "";
		$adresse = $data['adresse'] ?? "";
		$codePostal = $data['codePostal'] ?? "";
		$ville = $data['ville'] ?? "";
		$email = $data['email'] ?? "";
		$sexe = $data['sexe'] ?? "";
		$login = $data['login'] ?? "";
		$password = $data['password'] ?? "";
		$telephone = $data['telephone'] ?? "";
	
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			return $response->withStatus(400)
							->withHeader('Content-Type', 'application/json')
							->write(json_encode(['error' => 'Invalid email format']));
		}
	
		$utilisateurRepository = $entityManager->getRepository('Utilisateurs');
		
		$existingEmail = $utilisateurRepository->findOneBy(['email' => $email]);
		if ($existingEmail) {
			return $response->withStatus(409)
						   ->withHeader('Content-Type', 'application/json')
						   ->write(json_encode(['error' => 'Email already exists']));
		}
	
		$existingLogin = $utilisateurRepository->findOneBy(['login' => $login]);
		if ($existingLogin) {
			return $response->withStatus(409)
						   ->withHeader('Content-Type', 'application/json')
						   ->write(json_encode(['error' => 'Login already exists']));
		}
	
		$utilisateur = new Utilisateurs();
		$utilisateur->setNom($nom);
		$utilisateur->setPrenom($prenom);
		$utilisateur->setAdresse($adresse);
		$utilisateur->setCodePostal($codePostal);
		$utilisateur->setVille($ville);
		$utilisateur->setEmail($email);
		$utilisateur->setSexe($sexe);
		$utilisateur->setLogin($login);
		$utilisateur->setPassword(password_hash($password, PASSWORD_DEFAULT));
		$utilisateur->setTelephone($telephone);
	
		$entityManager->persist($utilisateur);
		$entityManager->flush();
	
		$userData = [
			'id' => $utilisateur->getId(),
			'nom' => $utilisateur->getNom(),
			'prenom' => $utilisateur->getPrenom()
		];
	
		$response = createJwt($response, $userData);
		$response = $response->withHeader('Content-Type', 'application/json');
		$response->getBody()->write(json_encode($userData));
	
		return addHeaders($response);
	}
	
	

