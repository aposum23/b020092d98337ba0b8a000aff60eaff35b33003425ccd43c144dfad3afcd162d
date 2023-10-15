import {instance} from "@/api/requestsInstance.ts";

export const getExtendedInformationAboutDepartment = (data:object) => instance({url:'get_extended_info', method:'get', params: data});