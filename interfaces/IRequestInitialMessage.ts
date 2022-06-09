export default interface IRequestInitialMessage {
  messaging_product: string;
  to: number;
  type: string;
  template: { name: string; language: { code: string } };
}