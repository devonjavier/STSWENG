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
  additionalreq: string;
}

export interface TimeSlot {
  time: string;
  status: string;
}

export interface FAQ {
  faq_id : string,
  question: string;
  answer: string;
}

export interface Service {
  serviceid: number;
  title: string;
  description: string;
  price?: number; // This will be added based on the type of service
  // Other fields as needed
}

export interface OnetimeService {
  serviceid: number;
  rate: number;
}

export interface HourlyService {
  serviceid: number;
  rate: number;
}