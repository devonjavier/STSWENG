export interface Services{
    serviceid : number;
    title : string;
    is_addon : boolean;
    addons? : Services[];
  }

export interface accountData {
    password : string;
    personid : string;
    username : string;
    emailaddress :  string;
  }
  