
<?php
 
 include '../conexao/conexao.php';
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");

 //http://localhost/API/visualizar.php?id=124

 $id = filter_input(INPUT_GET,'id',FILTER_SANITIZE_NUMBER_INT);

 if(!empty($id)){
    
    $sql = "SELECT id,nome,email,telefone FROM contatos WHERE id = :id LIMIT 1";
    $query_contato = $conn->prepare($sql);
    $query_contato->bindParam(':id',$id,PDO::PARAM_INT);
    $query_contato->execute();

    if(($query_contato) AND($query_contato->rowCount() !=0 )){
      
        $row_contato =$query_contato->fetch(PDO::FETCH_ASSOC);
        extract($row_contato);
        $contato=[
            'id'=>$id,
            'nome' => $nome,
            'email'=> $email,
            'telefone'=>$telefone
        ];
        $response = [
            "erro" => true,
            "messagem"=>"cliente encontrado com sucesso!",
            "contato" => $contato
        ];
        echo json_encode($response);
    }else
    {
        $response = [
            "erro" => true,
            "messagem"=>" Nenhum cliente encontrado!",
           ];
        echo json_encode($response);  
    }
 }
 
 http_response_code(200);

 ?>