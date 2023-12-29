import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const  typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'dpg-clt5rrla73kc73eecho0-a.ohio-postgres.render.com',
  port: 5432,
  username: 'api_viveiro_user',
  password: '821jLP2VaAi44YINNk0eNba0iNxkouyC',
  database: 'api_viveiro',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
    
  }


}


/* seguindo o tutorial: https://medium.com/@iago.maiasilva/construindo-uma-api-com-nestjs-postgresql-e-docker-parte-1-criando-nosso-primeiro-endpoint-248d4b8ecc9c
 não estou usando docker e fiz a conexao com Render.com que tenho e tive que adicionar apenas o seguinte codigo: 
 ssl: {
   rejectUnauthorized: false,
  
 }*/
