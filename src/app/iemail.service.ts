export interface IEmailService {
  sendEmail(from: string, to: string, subject: string, body: string): boolean;
}
