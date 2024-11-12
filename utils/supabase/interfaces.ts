export interface allService{
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
  endtime: string;
  reservee: string;
  title: string;
  service: string;
  status: string;
  totalamountdue: string;
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
  additionalPersonNames: string[];
  status: string;
  trackingnumber: string;
  totalamountdue: string;
}

export interface TimeSlot {
  time: string;
  status: string;
}

export interface FAQ {
  id : string,
  question: string;
  answer: string;
}


export interface Service {
  serviceid: number;
  title: string;
  description: string;
  price?: number; 
  imageName: string;
  imageUrl: {publicUrl: string};
}

export interface OnetimeService {
  serviceid: number;
  rate: number;
}

export interface HourlyService {
  serviceid: number;
  rate: number;
}

export interface forTheErrors {
  firstName: string;
  middleName?: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}


export interface forTheTicketErrors {
  userName: string;
  userEmail: string;
  userServiceType: string;
  userQuestion: string;
}

export interface forTheBookEditErrors {
  userFirstName: string;
  userMiddleName: string;
  userLastName: string;
  userPhoneNum: string;
  userEmail: string;
  hours: number;
  date: string;
}