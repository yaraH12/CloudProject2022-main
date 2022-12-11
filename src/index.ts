import si from 'systeminformation';
import express from 'express';

interface ISystemInformation {
  //Interface est le type et ne signifie pas le meme mot qu'en java(pour definir le modele et les fonctions)
  cpu: si.Systeminformation.CpuData; // Comme char fc;-->C'est juste le type de fc
  system: si.Systeminformation.SystemData;
  mem: si.Systeminformation.MemData;
  os: si.Systeminformation.OsData;
  currentLoad: si.Systeminformation.CurrentLoadData;
  processes: si.Systeminformation.ProcessesData;
  diskLayout: si.Systeminformation.DiskLayoutData[];
  networkInterfaces: si.Systeminformation.NetworkInterfacesData[];
}

const info: ISystemInformation = {} as ISystemInformation; //as... c'est pour ajouter les clees

const app = express();
//au lieu de express on peut utiliser l'api HTTP de node.js

app.get('/api/v1/systeminfo', async (req, res) => {
  //request response
  info.cpu = await si.cpu();
  info.system = await si.system();
  info.mem = await si.mem();
  info.os = await si.osInfo();
  info.currentLoad = await si.currentLoad();
  info.processes = await si.processes();
  info.diskLayout = await si.diskLayout();
  info.networkInterfaces = await si.networkInterfaces();
  res.status(200).send(info); //envoyer le status code 200(OK) avant d'envoyer l'info
});

app.get('/*', async (req, res) => {
  res.status(404).send({ Error: 404 });
});

const variable = app.listen(8000, () => {
  console.log('Server On');
});

export default variable;
