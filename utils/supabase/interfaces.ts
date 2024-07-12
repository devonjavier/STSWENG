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
  

export interface reservation {
  appointmentid: number;
  date: string;
  starttime: string;
  reservee: string;
  service: string;
  status: string;
}

export interface pending_appointment {
  name: string;
  contactnumber: string;
  emailaddress: string;
  isparkingspotneeded: boolean;
  title: string;
  date: string;
  starttime: string;
  endtime: string;
  appointmentid : string;
}

