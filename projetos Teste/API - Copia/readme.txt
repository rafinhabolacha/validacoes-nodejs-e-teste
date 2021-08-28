file_get_contents("php://input");

pra ler valor
json_decode();

pra retorna formato json
json_encode()

//http_response_code(200)

//echo json_encode($dados['exemplo']);
utiliza o postman pra testa
{
   "exemplo":"teste" 
}

if($dados){
    criando um array
   $response=[
       "error" => false
        "messagem" => "cadastrado com sucesso!"
   ];
}else{
  $response=[
       "error" => true
       "messagem" => "nao cadastrado com sucesso"
   ];

}
http_response_code(200)

echo json_encode($response);

