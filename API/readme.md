notas importantes:
    -fazer calls assincronas 
        -Exemplo
             public async Task<IActionResult> GetValues()
               {
                  var values= await context.Values.ToListAsync();
                 return Ok(values);
                 }

Database migrations:
- criar os models
- data context
- configurar services no startup.cs
- definir a conection string que vem do appsettings.json
- comando de migrations 
    -Gerar migration: "dotnet ef migrate add inicialCreate" 
        (vai criar ficheiros no folder das migrations) (usa automaticamente o id (caso exista) para a primary key) 
    -Aplicar migration: "dotnet ef database update"  (cria se não existir)


ler informação da base de dados:
-injectar data context  no controllador(atravês do constructor)