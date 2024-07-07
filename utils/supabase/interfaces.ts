export interface service{
    serviceid : number;
    title : string;
    description : string;
    serviceType : 'onetime' | 'hourly';
  }

export interface accountData {
    password : string;
    personid : string;
    username : string;
    emailaddress :  string;
  }
  
export interface schedule{
    scheduleid : number;
    date : Date;
    starttime:string;
    endtime:string;
  }