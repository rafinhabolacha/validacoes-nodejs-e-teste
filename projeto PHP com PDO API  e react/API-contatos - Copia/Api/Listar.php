<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include '../conexao/conexao.php';

$sql = "SELECT  id,nome,email,telefone FROM contatos ";
$res = $conn->prepare($sql);
$res->execute();

if(($res) AND ($res->rowCount()!= 0)){
   while($row_contato = $res->fetch(PDO::FETCH_ASSOC))
    {
        extract($row_contato);
        $lista_contato["contatos"][$id]=[
            'id' => $id,
            'nome'=> $nome,
            'email'=>$email,
            'telefone'=>$telefone
         ];
    }
   

  
}

echo json_encode($lista_contato);
//echo json_encode($response);
 http_response_code(200);


?>