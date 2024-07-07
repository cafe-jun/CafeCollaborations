import 'module-alias';
import { ServerApplication } from '@application/server.application';

async function runApplication(): Promise<void> {
  const serverAplication: ServerApplication = ServerApplication.create();
  await serverAplication.start();
}

runApplication();
