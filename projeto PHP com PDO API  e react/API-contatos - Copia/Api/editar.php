<?php
include '../conexao/conexao.php';
 //cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: *");
 header("Acess-Controll-Allow-Methods: GET,PUT,POST,DELETE");

  //recebe os dados do formulario
$response_json = file_get_contents("php://input");

//é um objeto pra poder ler o valor
$dados =json_decode($response_json,true);

if($dados){
    $query_contato = "UPDATE contatos SET nome=:nome, email=:email,telefone=:telefone WHERE id=:id";
    $sql = $conn->prepare($query_contato);
    $sql->bindParam(':id',$dados['id'],PDO::PARAM_INT);
    $sql->bindParam(':nome',$dados['nome'],PDO::PARAM_STR);
    $sql->bindParam(':email',$dados['email'],PDO::PARAM_STR);
    $sql->bindParam(':telefone',$dados['telefone'],PDO::PARAM_INT);
    $sql->execute();
    if($sql->rowCount()){
     $response = [
         "erro" => false,
         "mensagem"=>"Contato editado com Sucesso! ",
        // "dados"=>$dados
       ];
       echo json_encode($response);
   }else{
     $response = [
         "erro" => true,
         "mensagem"=>"Contato ja existente ! ",
        // "dados"=>$dados
       ];
       echo json_encode($response); 
   }
   
}
else
{
  $response = [
        "erro" => true,
        "messagem"=>"Erro: Tente mais tarde! ",
       
      ];
      echo json_encode($response);  
}
http_response_code(200);

?>