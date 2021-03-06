const {Client}=require('pg');
const client=new Client({
  user: 'postgres',
  database: 'postgres',
  password: '2020',
  host: 'localhost',   //Todos estos parametros, si no se declaran, se establecen por defecto (ver documentacion. En caso del host, el por defecto tambien es localhost, pero lo incluyo por inercia)
});
client.connect();
exports.editProfile=async (req, res)=>{
  try{
    /*Antes de insertar el encabezado y la descripcion, debo validar esos datos.
    postgres, por ejemplo, guarda comiilas (') si cada comilla se representa como doble. 
    Aqui un ejemplo:*/
    for (let i=0; i<req.body.encabezado.length; i++){
      if (req.body.encabezado[i]==="'"){
        req.body.encabezado=req.body.encabezado.replace(req.body.encabezado[i], "''");
        i++;
      }
    }
    for (let j=0; j<req.body.descripcion.length; j++){
      if (req.body.descripcion[j]==="'"){
        req.body.descripcion=req.body.descripcion.replace(req.body.descripcion[j], "''");
        j++;
      }
    }
  	let consulta=`UPDATE users SET header='${req.body.encabezado}', bodytype='${req.body.tipoDeCuerpo}', heigth='${req.body.altura}',
  	 ethnicgroup='${req.body.grupoEtnico}', maritalstatus='${req.body.estadoCivil}', sons='${req.body.hijos}', housingsituation='${req.body.
  	 situacionDeVivienda}', educationallevel='${req.body.nivelDeEstudios}', work='${req.body.trabaja}', smokes='${req.body.fuma}', drink='${req.body.bebe}',
  	 description='${req.body.descripcion}' WHERE username='${req.user}'`;
    await client.query(consulta);
    res.json({message:'Actualizacion exitosa'});
  } catch(err){
  	res.json({message:'Error, intentelo de nuevo.'});
  	throw err; 
  }
}