import { myappointments } from "../components/element/images";



export const AppointmentsHeaders = [
   
    { key: "serialNo", label: "S.No", sortable: false, visible: true }, 
          { key: "date", label: "Date", sortable: true, visible: true },
  { key: "day", label: "Day", sortable: true, visible: true },
  { key: "time", label: "Time", visible: true },
    { key: "amount", label: "Amount", sortable: true, visible: true },
    { key: "labName", label: "Name", sortable: true, visible: true },
    { key: "status", label: "Status", sortable: true, visible: true },
];


export const LabTestHeaders = [
    { key: "serialNo", label: "S.No", sortable: false, visible: true }, 
    { key: "labName", label: "Name", sortable: true, visible: true },
    { key: "date", label: "Date", sortable: true, visible: true },
{ key: "day", label: "Day", sortable: true, visible: true },
{ key: "time", label: "Time", visible: true },
{ key: "amount", label: "Amount", sortable: true, visible: true },
{key:"fileUrl", label:"Prescription", sortable:true, visible:true},
// { key: "status", label: "Status", sortable: true, visible: true },
]