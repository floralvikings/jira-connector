import K, { JiraClient } from './';

const connector = new K({ host: '' });

connector.backlog.moveIssuesToBacklog();
