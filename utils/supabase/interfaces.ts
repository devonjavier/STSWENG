export interface service{
    serviceid : string;
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
  scheduleid : string;
  date : string;
  starttime : string;
  endtime : string;
}
  