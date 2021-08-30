<?php
include '../conexao/conexao.php';
//cabeçalho obrigatorios
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: *");
header("Acess-Controll-Allow-Methods: GET,PUT,POST,DELETE");

$response_json = file_get_contents("php://input");
$dados =json_decode($response_json,true);

if(empty($dados['nome']) || empty($dados['telefone']) || empty($dados['email'])){

    $response=[
        //houve error?
    //true = sim houve
    'error' => true,
   'messagem' =>'Preencha os campos corretamento!'
    ];
    echo json_encode($response);
}else{

    $sql = "INSERT INTO contatos (nome,email,telefone)VALUES(:nome, :email,:telefone)";
    $cad_Cliente = $conn->prepare($sql);
    $cad_Cliente->bindParam(':nome',$dados['nome']);
    $cad_Cliente->bindParam(':email',$dados['email']);
    $cad_Cliente->bindParam(':telefone',$dados['telefone']);
    $cad_Cliente->execute();

    if($cad_Cliente->rowCount())
           {
             $response=[
                    //houve error?
                  //true = sim houve
                 'error' => false,
                 'messagem' =>' dados gravado com sucesso!',
                 'contato:'=>$dados
                ];
              echo json_encode($response);
            }
            else
            {
                $response=[
                //houve error?
                //true = sim houve
                'error' => true,
                'messagem' =>'Error: dados gravado com sucesso!',
                'contato:'=>$dados
                 ];
              echo json_encode($response);

            }
           //se dado foi enviado
            $response=[
                //houve error?
            //true = sim houve
            'error' => false,
            'messagem' =>'dados enviado com sucesso!',
            'contato:'=>$dados
            ];
            echo json_encode($response);
       }







http_response_code(200);


?>