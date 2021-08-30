<?php
//cabeçalho obrigatorios
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 include '../conexao/conexao.php';
//recebe o id pela URL
 $id =filter_input(INPUT_GET,"id",FILTER_SANITIZE_NUMBER_INT);
 if(empty($id))
 {
    $response =[
        "erro" => true,
        "mensagem" => "Contato não encontrado!"

    ];
    echo json_encode($response);
  }
 else
    {
   
        $sql = "SELECT id FROM contatos WHERE id = :id LIMIT 1";
        $query_contato = $conn->prepare($sql);
        $query_contato->bindParam(':id',$id,PDO::PARAM_INT);
        $query_contato->execute();
       
        if(($query_contato) AND($query_contato->rowCount() !=0 ))
        {

           $query_contato = "DELETE FROM contatos WHERE id=:id LIMIT 1";
            $delete_contato = $conn->prepare($query_contato);
            $delete_contato->bindParam(':id',$id,PDO::PARAM_INT);
            if($delete_contato->execute()){
                $response =[
                    "erro" => false,
                    "mensagem" => "Contato apagado com sucesso!"
            
                ];
                echo json_encode($response);
            }
            else{
                $response =[
                    "erro" => true,
                  "mensagem" => "Contato não apagado com sucesso!"
            
                ];
                echo json_encode($response);
            }

        }
        else
        {
            $response =[
                "erro" => true,
                "mensagem" => "Contato não encontrado!"
        
            ];
            echo json_encode($response);
        }
    }
 
 http_response_code(200);

 ?>