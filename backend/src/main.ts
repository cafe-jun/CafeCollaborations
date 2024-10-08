import 'module-alias';
import { ServerApplication } from '@application/server.application';

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.create();
  await serverApplication.start();
}

runApplication();
