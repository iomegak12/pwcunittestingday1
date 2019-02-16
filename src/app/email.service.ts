import { IEmailService } from './iemail.service';

export class EmailService implements IEmailService {
  sendEmail(from: string, to: string, subject: string, body: string): boolean {
    console.info('Email Sent Successfully ...');

    return true;
  }
}
