/**
 * Created by asellers on 5/23/17.
 * The users model will store details returned from salesforce
 * specifically around access tokens and user id. These details are
 * then used for subsequent calls to Salesforce.
 */

export class Users {
  access_token: String;
  instance_url: String;
  id: String;
  token_type: String;
  issued_at: String;
  signature: String;
}
